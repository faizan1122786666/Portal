





const attendanceModel = require('../models/attendance.model');
const userModel = require('../models/user.model');


// ── Helper: get today's date as YYYY-MM-DD ────────────────────────────────────
function getTodayDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ── Helper: format current time as "09:02 AM" ─────────────────────────────────
function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// ── Helper: calculate minutes between two time strings ────────────────────────
function minutesBetween(checkIn, checkOut) {
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  };
  let diff = parseTime(checkOut) - parseTime(checkIn);
  // If checkOut is earlier than checkIn, it's a midnight crossing
  if (diff < 0) diff += 1440;
  return diff;
}

// ── Shift Time Boundaries ──────────────────────────────────────────────────
const SHIFT_TIMES = {
  Morning: { start: '09:00 AM', end: '06:00 PM' },
  Evening: { start: '06:00 PM', end: '03:00 AM' },
};

// ── Helper: parse time string to minutes (0-1439) ─────────────────────────────
function toMins(timeStr) {
  if (!timeStr) return 0;
  const [time, modifier] = timeStr.split(' ');
  let [hours, minutes] = time.split(':').map(Number);
  if (modifier === 'PM' && hours !== 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

// ── Helper: check if currentTime is within given shift boundaries ─────────────
function isWithinShift(timeStr, shift) {
  const cfg = SHIFT_TIMES[shift];
  if (!cfg) return true; // fallback if no config
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

// ── Helper: check if time A is before time B ──────────────────────────────────
function isBeforeTime(timeA, timeB) {
  return toMins(timeA) < toMins(timeB);
}


// ── Helper: format minutes as "Xh Ym" ────────────────────────────────────────
function formatMinutes(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${h}h ${m}m`;
}

// ── Helper: recalculate totalWorkHours from all completed sessions ─────────────
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

// ── Helper: Automatic Clock-Out ──────────────────────────────────────────────
async function handleAutoCheckOut(record) {
  if (!record || record.status !== 'Present') return record;

  const openSession = record.sessions.find(s => s.checkIn && !s.checkOut);
  if (!openSession) return record;

  const currentShift = record.shift;
  const cfg = SHIFT_TIMES[currentShift];
  if (!cfg) return record;

  const currentTime = getCurrentTime();

  // If current time is no longer within the shift, auto-checkout at shift end
  if (!isWithinShift(currentTime, currentShift)) {
    // Only auto-checkout if current time is AFTER the shift end.
    // (Wait, if isWithinShift is false, it's either before or after).
    // If it's after end but before next day's start, it should be auto-checked out.

    // To be safe: if toMins(currentTime) is between end and end + some margin
    // Actually, user said "if the time up the clock out automatically done"
    // So if they are NOT in shift, and they HAD an open session, close it.
    openSession.checkOut = cfg.end;
    openSession.workHours = formatMinutes(minutesBetween(openSession.checkIn, cfg.end));
    record.totalWorkHours = recalcTotal(record.sessions);
    await record.save();
  }
  return record;
}

// ── POST /api/attendance/checkin ──────────────────────────────────────────────
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

    // ── SHIFT RESTRICTION: Check Assigned Shift from User Profile ─────────────
    const user = await userModel.findById(employeeId);
    const assignedShift = user?.shift;

    if (!assignedShift || !SHIFT_TIMES[assignedShift]) {
      return res.status(400).json({
        message: 'No valid work shift (Morning/Evening) is assigned to your account. Please contact your admin.'
      });
    }

    // Step 1: Check if current time belongs to the assigned shift
    if (!isWithinShift(checkInTime, assignedShift)) {
      const otherShift = assignedShift === 'Morning' ? 'Evening' : 'Morning';
      if (isWithinShift(checkInTime, otherShift)) {
        return res.status(400).json({
          message: `You are assigned a ${assignedShift} shift. You cannot clock in during the ${otherShift}.`
        });
      }
      // If it's neither (e.g., dead zone), show generic "not your shift time"
      return res.status(400).json({
        message: `It is currently not your shift time (${SHIFT_TIMES[assignedShift].start} – ${SHIFT_TIMES[assignedShift].end}).`
      });
    }

    // Step 2: Prevent clock-in BEFORE the shift start time
    // If they are more than 2 hours before, we already showed "not your shift time".
    // If they are within 2 hours BEFORE the start, show the specific "cannot clock in before" message.
    const startMins = toMins(SHIFT_TIMES[assignedShift].start);
    const nowMins = toMins(checkInTime);
    let diff = startMins - nowMins;
    if (diff < 0) diff += 1440; // handle wrap around for evening start (e.g. now is 5 PM, start is 6 PM)

    if (diff > 0 && diff <= 120) { // If within 2 hours before start
      return res.status(400).json({
        message: `Your shift starts at ${SHIFT_TIMES[assignedShift].start}. You cannot clock in before that. Current time: ${checkInTime}`
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


// ── POST /api/attendance/checkout ─────────────────────────────────────────────
async function checkOut(req, res) {
  try {
    const employeeId = req.user.id;
    const today = getTodayDate();

    // 1. Try to find an open session for TODAY
    let record = await attendanceModel.findOne({ employeeId, date: today });
    let openSession = record?.sessions.find(s => s.checkIn && !s.checkOut);

    if (!record || !openSession) {
      return res.status(400).json({ message: 'No open check-in found. Please check in first.' });
    }

    const checkOutTime = getCurrentTime();
    const currentShift = record.shift;

    // ── SHIFT RESTRICTION: Cannot clock out after given time ────────────────
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


// ── GET /api/attendance/today-status ─────────────────────────────────────────
async function getTodayStatus(req, res) {
  try {
    const today = getTodayDate();

    // Fetch user to get their assigned shift
    const user = await userModel.findById(employeeId);
    const assignedShift = user?.shift || null;

    let record = await attendanceModel.findOne({ employeeId, date: today });

    // ── NEW: Trigger Auto Checkout if shift ended ──────────────────────────
    if (record) {
      record = await handleAutoCheckOut(record);
    }

    let openSession = record?.sessions?.find(s => s.checkIn && !s.checkOut) || null;

    const isCheckedIn = !!openSession;

    return res.status(200).json({
      date: record?.date || today,
      hasRecord: !!record,
      shift: record?.shift || assignedShift, // record shift if clocked in, else assigned shift
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


// ── GET /api/attendance/my ────────────────────────────────────────────────────
async function getMyAttendance(req, res) {
  try {
    const employeeId = req.user.id;
    const { month, date } = req.query;

    let filter = { employeeId };
    if (date) filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel.find(filter).sort({ date: -1 });

    const summary = {
      present: records.filter(r => r.status === 'Present').length,
      absent: records.filter(r => r.status === 'Absent').length,
      leave: records.filter(r => r.status === 'Leave').length,
      total: records.length
    };

    return res.status(200).json({ message: 'Attendance records fetched', records, summary });

  } catch (error) {
    console.error('GetMyAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN CONTROLLERS
// ═══════════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/attendance ─────────────────────────────────────────────────
// FIX: After populate, filter out records whose employeeId was deleted (null).
// This prevents showing ghost records for employees the admin has already removed.
async function getAllAttendance(req, res) {
  try {
    const { date, employeeId, month } = req.query;

    let filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (date) filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel
      .find(filter)
      .populate('employeeId', '-password')
      .sort({ date: -1 });

    // ── KEY FIX: remove records whose employee no longer exists ──────────────
    const activeRecords = records.filter(r => r.employeeId !== null);

    return res.status(200).json({
      message: 'All attendance records fetched',
      count: activeRecords.length,
      records: activeRecords
    });

  } catch (error) {
    console.error('GetAllAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/admin/attendance/today-summary ───────────────────────────────────
// FIX: totalEmployees now only counts CURRENTLY existing employees (not deleted).
// Present/absent/leave counts also only reflect active employees.
async function getTodaySummary(req, res) {
  try {
    const today = getTodayDate();

    // Only count employees that CURRENTLY exist in the DB
    const totalEmployees = await userModel.countDocuments({ role: 'employee' });

    // Get IDs of all currently existing employees
    const activeEmployees = await userModel.find({ role: 'employee' }, '_id');
    const activeIds = activeEmployees.map(e => e._id.toString());

    // Get today's records — only for active employees
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


// ── GET /api/admin/attendance/employee/:id ────────────────────────────────────
async function getEmployeeAttendance(req, res) {
  try {
    const { id } = req.params;
    const { month, date } = req.query;

    // FIX: return 404 if employee was deleted
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


// ── POST /api/admin/attendance/mark ──────────────────────────────────────────
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


// ── PUT /api/admin/attendance/:id ─────────────────────────────────────────────
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


// ── DELETE /api/admin/attendance/:id ─────────────────────────────────────────
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