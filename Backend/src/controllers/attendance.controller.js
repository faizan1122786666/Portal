/**
 * File: attendance.controller.js
 * Description: Handles all attendance operations including employee check-in/out with shift enforcement and admin record management.
 * Why: To enforce shift-based clock-in/out rules, manage multi-session daily attendance, and provide admins with full visibility and control over all records.
 */

const attendanceModel = require('../models/attendance.model');
const userModel = require('../models/user.model');

/**
 * Function: getTodayDate
 * Description: Returns today's date formatted as 'YYYY-MM-DD'.
 * Why: To generate a consistent date key for attendance records without timezone drift.
 */
function getTodayDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

/**
 * Function: getCurrentTime
 * Description: Returns the current local time formatted as '09:02 AM'.
 * Why: To capture the precise clock-in or clock-out time for each session.
 */
function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Function: minutesBetween
 * Description: Calculates the number of minutes between two time strings (e.g. '09:00 AM' and '06:00 PM'), handling midnight crossing.
 * Why: To accurately compute session duration for work hours calculation.
 */
function minutesBetween(checkIn, checkOut) {
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  let diff = parseTime(checkOut) - parseTime(checkIn);
  if (diff < 0) diff += 1440;
  return diff;
}

// Shift Time Boundaries
const SHIFT_TIMES = {
  Morning: { start: '09:00 AM', end: '06:00 PM' },
  Evening: { start: '06:00 PM', end: '03:00 AM' },
};

/**
 * Function: toMins
 * Description: Converts a time string (e.g. '09:00 AM') to total minutes since midnight.
 * Why: To enable numeric comparison of times for shift boundary checks.
 */
function toMins(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

/**
 * Function: isWithinShift
 * Description: Returns true if a given time string falls within the start/end bounds of the specified shift, including midnight-crossing shifts.
 * Why: To enforce shift restrictions during check-in and check-out operations.
 */
function isWithinShift(timeStr, shift) {
  const cfg = SHIFT_TIMES[shift];
  if (!cfg) return true;
  const t = toMins(timeStr);
  const s = toMins(cfg.start);
  const e = toMins(cfg.end);

  if (e > s) {
    return t >= s && t < e;
  } else {
    // Crosses midnight (e.g., 6 PM to 3 AM)
    return t >= s || t < e;
  }
}

/**
 * Function: formatMinutes
 * Description: Converts a total number of minutes into a human-readable string like '9h 30m'.
 * Why: To display work hours in a readable format on both admin and employee dashboards.
 */
function formatMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

/**
 * Function: recalcTotal
 * Description: Sums the work hours of all completed sessions in a day's attendance record.
 * Why: To keep the totalWorkHours field accurate after each checkout or admin edit.
 */
function recalcTotal(sessions) {
  const total = sessions.reduce((sum, s) => {
    if (s.checkIn && s.checkOut) {
      return sum + minutesBetween(s.checkIn, s.checkOut);
    }
    return sum;
  }, 0);
  return total > 0 ? formatMinutes(total) : null;
}

// ═══════════════════════════════════════════════════════════════════════════════
//  EMPLOYEE CONTROLLERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: handleAutoCheckOut
 * Description: Automatically closes any open session if the employee's shift has ended.
 * Why: To prevent employees from being permanently "checked in" past their shift's end time.
 */
async function handleAutoCheckOut(record) {
  if (!record || record.status !== 'Present') return record;

  const openSession = record.sessions.find(s => s.checkIn && !s.checkOut);
  if (!openSession) return record;

  const currentShift = record.shift;
  const cfg = SHIFT_TIMES[currentShift];
  if (!cfg) return record;

  const currentTime = getCurrentTime();

  if (!isWithinShift(currentTime, currentShift)) {
    openSession.checkOut = cfg.end;
    openSession.workHours = formatMinutes(minutesBetween(openSession.checkIn, cfg.end));
    record.totalWorkHours = recalcTotal(record.sessions);
    await record.save();
  }
  return record;
}

/**
 * Function: checkIn
 * Description: Records the start of an employee's work session, enforcing shift assignment and time-boundary rules.
 * Why: To ensure employees can only clock in during their assigned shift window and prevent duplicate open sessions.
 */
async function checkIn(req, res) {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();
    const { shift } = req.body;

    let record = await attendanceModel.findOne({ employeeId, date: today });

    if (record) {
      const openSession = record.sessions.find(s => s.checkIn && !s.checkOut);
      if (openSession) {
        return res.status(400).json({
          message: `You are already checked in at ${openSession.checkIn}. Please check out first.`
        });
      }
    } else {
      const VALID_SHIFTS_ENUM = ['Morning', 'Evening'];
      if (!shift || !VALID_SHIFTS_ENUM.includes(shift)) {
        return res.status(400).json({
          message: 'Please select a valid shift (Morning or Evening) before clocking in.'
        });
      }
    }

    const checkInTime = getCurrentTime();

    const user = await userModel.findById(employeeId);
    const assignedShift = user?.shift;

    if (!assignedShift || !SHIFT_TIMES[assignedShift]) {
      return res.status(400).json({
        message: 'No valid work shift (Morning/Evening) is assigned to your account. Please contact your admin.'
      });
    }

    const shiftStart = SHIFT_TIMES[assignedShift].start;
    const shiftEnd   = SHIFT_TIMES[assignedShift].end;
    const nowMins    = toMins(checkInTime);
    const startMins  = toMins(shiftStart);
    const endMins    = toMins(shiftEnd);

    const isBeforeShiftStart = (() => {
      if (endMins > startMins) {
        return nowMins < startMins;
      } else {
        // Midnight-crossing shift (Evening)
        return nowMins >= endMins && nowMins < startMins;
      }
    })();

    if (isBeforeShiftStart) {
      return res.status(400).json({
        message: `Your ${assignedShift} shift starts at ${shiftStart}. You cannot clock in before that. Current time: ${checkInTime}`
      });
    }

    const otherShift = assignedShift === 'Morning' ? 'Evening' : 'Morning';
    if (isWithinShift(checkInTime, otherShift)) {
      return res.status(400).json({
        message: `You are assigned a ${assignedShift} shift. You cannot clock in during the ${otherShift} shift (${SHIFT_TIMES[otherShift].start} – ${SHIFT_TIMES[otherShift].end}).`
      });
    }

    if (!isWithinShift(checkInTime, assignedShift)) {
      return res.status(400).json({
        message: `It is currently not your shift time. Your ${assignedShift} shift runs from ${shiftStart} to ${shiftEnd}.`
      });
    }

    if (!record) {
      record = await attendanceModel.create({
        employeeId,
        date: today,
        shift: assignedShift,
        sessions: [{ checkIn: checkInTime }],
        status: 'Present'
      });
    } else {
      record.sessions.push({ checkIn: checkInTime });
      record.status = 'Present';
      await record.save();
    }

    return res.status(200).json({
      message: `Checked in successfully at ${checkInTime}`,
      record
    });

  } catch (error) {
    console.error('CheckIn error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: checkOut
 * Description: Closes the employee's current open session, records work hours, and prevents checkout after shift end.
 * Why: To calculate accurate session and daily work hours while enforcing shift end boundaries.
 */
async function checkOut(req, res) {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    let record = await attendanceModel.findOne({ employeeId, date: today });
    let openSession = record?.sessions.find(s => s.checkIn && !s.checkOut);

    if (!record || !openSession) {
      return res.status(400).json({ message: 'No open check-in found. Please check in first.' });
    }

    const checkOutTime = getCurrentTime();
    const currentShift = record.shift;

    const shiftEnd = SHIFT_TIMES[currentShift]?.end;
    if (shiftEnd) {
      if (!isWithinShift(checkOutTime, currentShift)) {
        return res.status(400).json({
          message: `You cannot clock out after your shift ends at ${shiftEnd}. Current time: ${checkOutTime}`
        });
      }
    }

    const sessionMins = minutesBetween(openSession.checkIn, checkOutTime);

    openSession.checkOut = checkOutTime;
    openSession.workHours = formatMinutes(sessionMins);
    record.totalWorkHours = recalcTotal(record.sessions);

    await record.save();

    return res.status(200).json({
      message: `Checked out at ${checkOutTime}. Session: ${openSession.workHours}. Total: ${record.totalWorkHours}`,
      record
    });

  } catch (error) {
    console.error('CheckOut error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: getTodayStatus
 * Description: Returns the current attendance state for the logged-in employee, including open session info and shift details.
 * Why: To power the employee dashboard clock-in/out widget with real-time status and canCheckIn/canCheckOut flags.
 */
async function getTodayStatus(req, res) {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    const user = await userModel.findById(employeeId);
    const assignedShift = user?.shift || null;

    let record = await attendanceModel.findOne({ employeeId, date: today });

    if (record) {
      record = await handleAutoCheckOut(record);
    }

    let openSession = record?.sessions?.find(s => s.checkIn && !s.checkOut) || null;
    const isCheckedIn = !!openSession;

    return res.status(200).json({
      date: record?.date || today,
      hasRecord: !!record,
      shift: record?.shift || assignedShift,
      assignedShift,
      sessions: record?.sessions || [],
      totalWorkHours: record?.totalWorkHours || null,
      status: record?.status || 'Not Marked',
      currentCheckIn: openSession?.checkIn || null,
      canCheckIn: !isCheckedIn,
      canCheckOut: isCheckedIn,
    });

  } catch (error) {
    console.error('GetTodayStatus error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: getMyAttendance
 * Description: Fetches the logged-in employee's own attendance history, with optional date or month filtering.
 * Why: To let employees review their attendance records and summary statistics.
 */
async function getMyAttendance(req, res) {
  try {
    const employeeId = req.user.id;
    let { month, date, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    let filter = { employeeId };
    if (date) filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const skip = (page - 1) * limit;

    const totalRecords = await attendanceModel.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const records = await attendanceModel
      .find(filter)
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: 'My attendance records fetched',
      records,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords
      }
    });

  } catch (error) {
    console.error('GetMyAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN CONTROLLERS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Function: getAllAttendance
 * Description: Retrieves all attendance records with optional filtering, excluding records for deleted employees.
 * Why: To give admins a full view of workforce attendance across any date range or employee.
 */
async function getAllAttendance(req, res) {
  try {
    let { date, employeeId, month, page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);

    // Get all active employee IDs
    const activeEmployees = await userModel.find({ role: 'employee' }, '_id');
    const activeIds = activeEmployees.map(e => e._id);

    let filter = { employeeId: { $in: activeIds } };
    if (employeeId) {
      // If a specific employee is requested, check if they are active
      if (activeIds.some(id => id.toString() === employeeId)) {
        filter.employeeId = employeeId;
      } else {
        // Requested employee is not active or doesn't exist
        return res.status(200).json({
          message: 'All attendance records fetched',
          count: 0,
          records: [],
          pagination: { currentPage: page, totalPages: 0, totalRecords: 0 }
        });
      }
    }

    if (date) filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const skip = (page - 1) * limit;

    const totalRecords = await attendanceModel.countDocuments(filter);
    const totalPages = Math.ceil(totalRecords / limit);

    const records = await attendanceModel
      .find(filter)
      .populate('employeeId', '-password')
      .sort({ date: -1 })
      .skip(skip)
      .limit(limit);

    return res.status(200).json({
      message: 'All attendance records fetched',
      count: records.length,
      records,
      pagination: {
        currentPage: page,
        totalPages,
        totalRecords
      }
    });

  } catch (error) {
    console.error('GetAllAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: getTodaySummary
 * Description: Returns today's present/absent/on-leave counts for all currently active employees.
 * Why: To power the admin dashboard attendance summary widget, excluding ghost records from deleted employees.
 */
async function getTodaySummary(req, res) {
  try {
    const today = getTodayDate();

    const totalEmployees = await userModel.countDocuments({ role: 'employee' });
    const activeEmployees = await userModel.find({ role: 'employee' }, '_id');
    const activeIds = activeEmployees.map(e => e._id.toString());

    const allTodayRecords = await attendanceModel.find({ date: today });
    const todayRecords = allTodayRecords.filter(r =>
      activeIds.includes(r.employeeId.toString())
    );

    const present = todayRecords.filter(r => r.status === 'Present').length;
    const onLeave = todayRecords.filter(r => r.status === 'Leave').length;
    const absent = Math.max(totalEmployees - present - onLeave, 0);

    return res.status(200).json({ date: today, totalEmployees, present, absent, onLeave });

  } catch (error) {
    console.error('GetTodaySummary error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: getEmployeeAttendance
 * Description: Fetches attendance records for a specific employee with optional date/month filter.
 * Why: To allow admins to drill into an individual employee's attendance history and summary statistics.
 */
async function getEmployeeAttendance(req, res) {
  try {
    const { id } = req.params;
    const { month, date } = req.query;

    const employee = await userModel.findById(id).select('-password');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    let filter = { employeeId: id };
    if (date) filter.date = date;
    if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel.find(filter).sort({ date: -1 });

    const summary = {
      present: records.filter(r => r.status === 'Present').length,
      absent: records.filter(r => r.status === 'Absent').length,
      leave: records.filter(r => r.status === 'Leave').length,
      total: records.length
    };

    return res.status(200).json({ message: 'Employee attendance fetched', employee, records, summary });

  } catch (error) {
    console.error('GetEmployeeAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: markAttendance
 * Description: Allows an admin to manually create or overwrite an attendance record for any employee and date.
 * Why: To correct missing or incorrect records, such as forgotten check-ins or manual leave marking.
 */
async function markAttendance(req, res) {
  try {
    const { employeeId, date, status, checkIn, checkOut, shift } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: 'employeeId, date, and status are required' });
    }

    const employee = await userModel.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    let sessions = [];
    if (checkIn) {
      const session = { checkIn };
      if (checkOut) {
        session.checkOut = checkOut;
        session.workHours = formatMinutes(minutesBetween(checkIn, checkOut));
      }
      sessions = [session];
    }

    const totalWorkHours = sessions.length > 0 ? recalcTotal(sessions) : null;

    const record = await attendanceModel.findOneAndUpdate(
      { employeeId, date },
      { status, sessions, totalWorkHours, shift: shift || '' },
      { new: true, upsert: true }
    );

    return res.status(200).json({ message: 'Attendance marked successfully', record });

  } catch (error) {
    console.error('MarkAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: updateAttendance
 * Description: Updates the status, shift, and/or sessions of an existing attendance record.
 * Why: To allow admins to correct attendance data without deleting and recreating records.
 */
async function updateAttendance(req, res) {
  try {
    const { id } = req.params;
    const { status, sessions, shift } = req.body;

    const record = await attendanceModel.findById(id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });

    if (status) record.status = status;
    if (shift !== undefined) record.shift = shift;
    if (sessions) {
      record.sessions = sessions;
      record.totalWorkHours = recalcTotal(sessions);
    }

    await record.save();
    return res.status(200).json({ message: 'Attendance updated successfully', record });

  } catch (error) {
    console.error('UpdateAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

/**
 * Function: deleteAttendance
 * Description: Permanently removes an attendance record by ID.
 * Why: To allow admins to clean up erroneous or duplicate attendance entries.
 */
async function deleteAttendance(req, res) {
  try {
    const { id } = req.params;
    const record = await attendanceModel.findByIdAndDelete(id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });
    return res.status(200).json({ message: 'Attendance record deleted' });

  } catch (error) {
    console.error('DeleteAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

module.exports = {
  checkIn,
  checkOut,
  getMyAttendance,
  getTodayStatus,
  getAllAttendance,
  getTodaySummary,
  getEmployeeAttendance,
  markAttendance,
  updateAttendance,
  deleteAttendance
};