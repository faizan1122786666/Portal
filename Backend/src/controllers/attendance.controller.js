// const attendanceModel = require('../models/attendance.model');
// const userModel = require('../models/user.model');


// // ── Helper: get today's date as YYYY-MM-DD ────────────────────────────────────
// function getTodayDate() {
//     const now = new Date();
//     // Use local date to avoid timezone issues shifting the day
//     const yyyy = now.getFullYear();
//     const mm   = String(now.getMonth() + 1).padStart(2, '0');
//     const dd   = String(now.getDate()).padStart(2, '0');
//     return `${yyyy}-${mm}-${dd}`;
// }


// // ── Helper: format current time as "09:02 AM" ─────────────────────────────────
// function getCurrentTime() {
//     return new Date().toLocaleTimeString('en-US', {
//         hour:   '2-digit',
//         minute: '2-digit',
//         hour12: true
//     });
// }


// // ── Helper: calculate work hours between two time strings ─────────────────────
// // e.g. "09:02 AM" and "06:15 PM" → "9h 13m"
// function calculateWorkHours(checkIn, checkOut) {
//     const parseTime = (timeStr) => {
//         const [time, modifier] = timeStr.split(' ');
//         let [hours, minutes]   = time.split(':').map(Number);
//         if (modifier === 'PM' && hours !== 12) hours += 12;
//         if (modifier === 'AM' && hours === 12) hours = 0;
//         return hours * 60 + minutes; // total minutes from midnight
//     };

//     const inMinutes  = parseTime(checkIn);
//     const outMinutes = parseTime(checkOut);
//     const diff       = outMinutes - inMinutes;

//     if (diff <= 0) return '0h 0m';

//     const h = Math.floor(diff / 60);
//     const m = diff % 60;
//     return `${h}h ${m}m`;
// }


// // ═══════════════════════════════════════════════════════════════════════════════
// //  EMPLOYEE (USER) CONTROLLERS
// // ═══════════════════════════════════════════════════════════════════════════════

// // ── POST /api/attendance/checkin ──────────────────────────────────────────────
// // Employee checks in for today. Only allowed once per day.
// async function checkIn(req, res) {
//     try {
//         const employeeId = req.user.id;
//         const today      = getTodayDate();

//         // Check if a record already exists for today
//         const existing = await attendanceModel.findOne({ employeeId, date: today });

//         if (existing) {
//             if (existing.checkIn) {
//                 return res.status(400).json({ message: 'You have already checked in today' });
//             }
//         }

//         const checkInTime = getCurrentTime();

//         // If record exists but no checkIn (shouldn't normally happen), update it
//         // Otherwise create a new one
//         const record = await attendanceModel.findOneAndUpdate(
//             { employeeId, date: today },
//             {
//                 checkIn: checkInTime,
//                 status:  'Present'
//             },
//             {
//                 new:    true,   // return the updated document
//                 upsert: true    // create if doesn't exist
//             }
//         );

//         return res.status(200).json({
//             message: `Checked in successfully at ${checkInTime}`,
//             record
//         });

//     } catch (error) {
//         console.error('CheckIn error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── POST /api/attendance/checkout ─────────────────────────────────────────────
// // Employee checks out for today.
// async function checkOut(req, res) {
//     try {
//         const employeeId = req.user.id;
//         const today      = getTodayDate();

//         const record = await attendanceModel.findOne({ employeeId, date: today });

//         if (!record || !record.checkIn) {
//             return res.status(400).json({ message: 'You have not checked in today' });
//         }

//         if (record.checkOut) {
//             return res.status(400).json({ message: 'You have already checked out today' });
//         }

//         const checkOutTime = getCurrentTime();
//         const workHours    = calculateWorkHours(record.checkIn, checkOutTime);

//         record.checkOut  = checkOutTime;
//         record.workHours = workHours;
//         await record.save();

//         return res.status(200).json({
//             message: `Checked out successfully at ${checkOutTime}. Work hours: ${workHours}`,
//             record
//         });

//     } catch (error) {
//         console.error('CheckOut error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── GET /api/attendance/my ────────────────────────────────────────────────────
// // Employee gets their own attendance records.
// // Optional query params: ?month=2026-01 or ?date=2026-01-27
// async function getMyAttendance(req, res) {
//     try {
//         const employeeId = req.user.id;
//         const { month, date } = req.query;

//         // Build query filter
//         let filter = { employeeId };

//         if (date) {
//             // Filter by exact date: ?date=2026-01-27
//             filter.date = date;

//         } else if (month) {
//             // Filter by month: ?month=2026-01
//             // Using regex to match "2026-01-XX"
//             filter.date = { $regex: `^${month}` };
//         }

//         const records = await attendanceModel
//             .find(filter)
//             .sort({ date: -1 }); // newest first

//         // Calculate summary
//         const summary = {
//             present: records.filter(r => r.status === 'Present').length,
//             absent:  records.filter(r => r.status === 'Absent').length,
//             leave:   records.filter(r => r.status === 'Leave').length,
//             total:   records.length
//         };

//         return res.status(200).json({
//             message: 'Attendance records fetched',
//             records,
//             summary
//         });

//     } catch (error) {
//         console.error('GetMyAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── GET /api/attendance/today-status ─────────────────────────────────────────
// // Employee checks their status for today (have they checked in/out?)
// async function getTodayStatus(req, res) {
//     try {
//         const employeeId = req.user.id;
//         const today      = getTodayDate();

//         const record = await attendanceModel.findOne({ employeeId, date: today });

//         return res.status(200).json({
//             date:     today,
//             hasRecord: !!record,
//             checkIn:   record?.checkIn  || null,
//             checkOut:  record?.checkOut || null,
//             workHours: record?.workHours || null,
//             status:    record?.status   || 'Not Marked',
//             canCheckIn:  !record?.checkIn,
//             canCheckOut: !!record?.checkIn && !record?.checkOut
//         });

//     } catch (error) {
//         console.error('GetTodayStatus error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ═══════════════════════════════════════════════════════════════════════════════
// //  ADMIN CONTROLLERS
// // ═══════════════════════════════════════════════════════════════════════════════

// // ── GET /api/admin/attendance ─────────────────────────────────────────────────
// // Admin gets ALL employees' attendance.
// // Optional query: ?date=2026-01-27  or  ?employeeId=xxx  or  ?month=2026-01
// async function getAllAttendance(req, res) {
//     try {
//         const { date, employeeId, month } = req.query;

//         let filter = {};

//         if (employeeId) filter.employeeId = employeeId;

//         if (date) {
//             filter.date = date;
//         } else if (month) {
//             filter.date = { $regex: `^${month}` };
//         }

//         // Populate employee info (email, role, department) but exclude password
//         const records = await attendanceModel
//             .find(filter)
//             .populate('employeeId', '-password')  // join with user collection
//             .sort({ date: -1 });

//         return res.status(200).json({
//             message: 'All attendance records fetched',
//             count: records.length,
//             records
//         });

//     } catch (error) {
//         console.error('GetAllAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── GET /api/admin/attendance/today-summary ───────────────────────────────────
// // Admin gets today's summary: how many present, absent, on leave
// async function getTodaySummary(req, res) {
//     try {
//         const today = getTodayDate();

//         // Get total employee count (non-admin users)
//         const totalEmployees = await userModel.countDocuments({ role: 'employee' });

//         // Get today's records
//         const todayRecords = await attendanceModel.find({ date: today });

//         const present = todayRecords.filter(r => r.status === 'Present').length;
//         const onLeave = todayRecords.filter(r => r.status === 'Leave').length;
//         // Absent = total employees - present - on leave
//         const absent  = totalEmployees - present - onLeave;

//         return res.status(200).json({
//             date: today,
//             totalEmployees,
//             present,
//             absent:  absent < 0 ? 0 : absent,
//             onLeave
//         });

//     } catch (error) {
//         console.error('GetTodaySummary error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── GET /api/admin/attendance/employee/:id ────────────────────────────────────
// // Admin views a specific employee's full attendance history
// async function getEmployeeAttendance(req, res) {
//     try {
//         const { id } = req.params;
//         const { month, date } = req.query;

//         // Verify employee exists
//         const employee = await userModel.findById(id).select('-password');
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         let filter = { employeeId: id };
//         if (date)  filter.date = date;
//         if (month) filter.date = { $regex: `^${month}` };

//         const records = await attendanceModel
//             .find(filter)
//             .sort({ date: -1 });

//         const summary = {
//             present: records.filter(r => r.status === 'Present').length,
//             absent:  records.filter(r => r.status === 'Absent').length,
//             leave:   records.filter(r => r.status === 'Leave').length,
//             total:   records.length
//         };

//         return res.status(200).json({
//             message: 'Employee attendance fetched',
//             employee,
//             records,
//             summary
//         });

//     } catch (error) {
//         console.error('GetEmployeeAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── POST /api/admin/attendance/mark ──────────────────────────────────────────
// // Admin manually marks attendance for an employee
// // Body: { employeeId, date, status, checkIn, checkOut }
// async function markAttendance(req, res) {
//     try {
//         const { employeeId, date, status, checkIn, checkOut } = req.body;

//         if (!employeeId || !date || !status) {
//             return res.status(400).json({ message: 'employeeId, date, and status are required' });
//         }

//         // Verify employee exists
//         const employee = await userModel.findById(employeeId);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         // Calculate work hours if both times are provided
//         let workHours = null;
//         if (checkIn && checkOut) {
//             workHours = calculateWorkHours(checkIn, checkOut);
//         }

//         // Upsert: update if exists, create if not
//         const record = await attendanceModel.findOneAndUpdate(
//             { employeeId, date },
//             { status, checkIn: checkIn || null, checkOut: checkOut || null, workHours },
//             { new: true, upsert: true }
//         );

//         return res.status(200).json({
//             message: 'Attendance marked successfully',
//             record
//         });

//     } catch (error) {
//         console.error('MarkAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── PUT /api/admin/attendance/:id ─────────────────────────────────────────────
// // Admin edits an existing attendance record
// async function updateAttendance(req, res) {
//     try {
//         const { id } = req.params;
//         const { status, checkIn, checkOut } = req.body;

//         const record = await attendanceModel.findById(id);
//         if (!record) {
//             return res.status(404).json({ message: 'Attendance record not found' });
//         }

//         if (status)   record.status   = status;
//         if (checkIn)  record.checkIn  = checkIn;
//         if (checkOut) record.checkOut = checkOut;

//         // Recalculate work hours if both times now exist
//         if (record.checkIn && record.checkOut) {
//             record.workHours = calculateWorkHours(record.checkIn, record.checkOut);
//         }

//         await record.save();

//         return res.status(200).json({
//             message: 'Attendance updated successfully',
//             record
//         });

//     } catch (error) {
//         console.error('UpdateAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── DELETE /api/admin/attendance/:id ─────────────────────────────────────────
// // Admin deletes an attendance record
// async function deleteAttendance(req, res) {
//     try {
//         const { id } = req.params;

//         const record = await attendanceModel.findByIdAndDelete(id);
//         if (!record) {
//             return res.status(404).json({ message: 'Attendance record not found' });
//         }

//         return res.status(200).json({ message: 'Attendance record deleted' });

//     } catch (error) {
//         console.error('DeleteAttendance error:', error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// module.exports = {
//     // Employee
//     checkIn,
//     checkOut,
//     getMyAttendance,
//     getTodayStatus,

//     // Admin
//     getAllAttendance,
//     getTodaySummary,
//     getEmployeeAttendance,
//     markAttendance,
//     updateAttendance,
//     deleteAttendance
// };



















const attendanceModel = require('../models/attendance.model');
const userModel       = require('../models/user.model');


// ── Helper: get today's date as YYYY-MM-DD ────────────────────────────────────
function getTodayDate() {
  const now  = new Date();
  const yyyy = now.getFullYear();
  const mm   = String(now.getMonth() + 1).padStart(2, '0');
  const dd   = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ── Helper: format current time as "09:02 AM" ─────────────────────────────────
function getCurrentTime() {
  return new Date().toLocaleTimeString('en-US', {
    hour:   '2-digit',
    minute: '2-digit',
    hour12: true
  });
}

// ── Helper: calculate minutes between two time strings ────────────────────────
function minutesBetween(checkIn, checkOut) {
  const parseTime = (timeStr) => {
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes]   = time.split(':').map(Number);
    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours  = 0;
    return hours * 60 + minutes;
  };
  const diff = parseTime(checkOut) - parseTime(checkIn);
  return diff > 0 ? diff : 0;
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

// ── POST /api/attendance/checkin ──────────────────────────────────────────────
async function checkIn(req, res) {
  try {
    const employeeId = req.user.id;
    const today      = getTodayDate();

    // Find or create today's record
    let record = await attendanceModel.findOne({ employeeId, date: today });

    if (record) {
      // Check if there is already an open session (checked in but not out)
      const openSession = record.sessions.find(s => s.checkIn && !s.checkOut);
      if (openSession) {
        return res.status(400).json({
          message: `You are already checked in at ${openSession.checkIn}. Please check out first.`
        });
      }
    }

    const checkInTime = getCurrentTime();

    if (!record) {
      // Create new record with first session
      record = await attendanceModel.create({
        employeeId,
        date:     today,
        sessions: [{ checkIn: checkInTime }],
        status:   'Present'
      });
    } else {
      // Add a new session to existing record
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
    const today      = getTodayDate();

    const record = await attendanceModel.findOne({ employeeId, date: today });

    if (!record || record.sessions.length === 0) {
      return res.status(400).json({ message: 'You have not checked in today.' });
    }

    // Find the open session (checked in but not checked out)
    const openSession = record.sessions.find(s => s.checkIn && !s.checkOut);
    if (!openSession) {
      return res.status(400).json({
        message: 'No open check-in found. Please check in first.'
      });
    }

    const checkOutTime = getCurrentTime();
    const sessionMins  = minutesBetween(openSession.checkIn, checkOutTime);

    // Update the open session
    openSession.checkOut  = checkOutTime;
    openSession.workHours = formatMinutes(sessionMins);

    // Recalculate total work hours across all sessions
    record.totalWorkHours = recalcTotal(record.sessions);

    await record.save();

    return res.status(200).json({
      message:   `Checked out at ${checkOutTime}. Session: ${openSession.workHours}. Total today: ${record.totalWorkHours}`,
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
    const employeeId = req.user.id;
    const today      = getTodayDate();

    const record = await attendanceModel.findOne({ employeeId, date: today });

    // Is there an open (unclosed) session right now?
    const openSession = record?.sessions?.find(s => s.checkIn && !s.checkOut) || null;
    const isCheckedIn = !!openSession;

    return res.status(200).json({
      date:          today,
      hasRecord:     !!record,
      sessions:      record?.sessions      || [],
      totalWorkHours: record?.totalWorkHours || null,
      status:        record?.status        || 'Not Marked',
      // Current open session info
      currentCheckIn: openSession?.checkIn || null,
      canCheckIn:    !isCheckedIn,   // can check in only if no open session
      canCheckOut:    isCheckedIn,   // can check out only if there IS an open session
    });

  } catch (error) {
    console.error('GetTodayStatus error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/attendance/my ────────────────────────────────────────────────────
async function getMyAttendance(req, res) {
  try {
    const employeeId      = req.user.id;
    const { month, date } = req.query;

    let filter = { employeeId };
    if (date)  filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel.find(filter).sort({ date: -1 });

    const summary = {
      present: records.filter(r => r.status === 'Present').length,
      absent:  records.filter(r => r.status === 'Absent').length,
      leave:   records.filter(r => r.status === 'Leave').length,
      total:   records.length
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
async function getAllAttendance(req, res) {
  try {
    const { date, employeeId, month } = req.query;

    let filter = {};
    if (employeeId) filter.employeeId = employeeId;
    if (date)       filter.date = date;
    else if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel
      .find(filter)
      .populate('employeeId', '-password')
      .sort({ date: -1 });

    return res.status(200).json({ message: 'All attendance records fetched', count: records.length, records });

  } catch (error) {
    console.error('GetAllAttendance error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/admin/attendance/today-summary ───────────────────────────────────
async function getTodaySummary(req, res) {
  try {
    const today          = getTodayDate();
    const totalEmployees = await userModel.countDocuments({ role: 'employee' });
    const todayRecords   = await attendanceModel.find({ date: today });

    const present = todayRecords.filter(r => r.status === 'Present').length;
    const onLeave = todayRecords.filter(r => r.status === 'Leave').length;
    const absent  = Math.max(totalEmployees - present - onLeave, 0);

    return res.status(200).json({ date: today, totalEmployees, present, absent, onLeave });

  } catch (error) {
    console.error('GetTodaySummary error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/admin/attendance/employee/:id ────────────────────────────────────
async function getEmployeeAttendance(req, res) {
  try {
    const { id }          = req.params;
    const { month, date } = req.query;

    const employee = await userModel.findById(id).select('-password');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    let filter = { employeeId: id };
    if (date)  filter.date = date;
    if (month) filter.date = { $regex: `^${month}` };

    const records = await attendanceModel.find(filter).sort({ date: -1 });

    const summary = {
      present: records.filter(r => r.status === 'Present').length,
      absent:  records.filter(r => r.status === 'Absent').length,
      leave:   records.filter(r => r.status === 'Leave').length,
      total:   records.length
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
    const { employeeId, date, status, checkIn, checkOut } = req.body;

    if (!employeeId || !date || !status) {
      return res.status(400).json({ message: 'employeeId, date, and status are required' });
    }

    const employee = await userModel.findById(employeeId);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    // Build sessions array if times provided
    let sessions = [];
    if (checkIn) {
      const session = { checkIn };
      if (checkOut) {
        session.checkOut  = checkOut;
        session.workHours = formatMinutes(minutesBetween(checkIn, checkOut));
      }
      sessions = [session];
    }

    const totalWorkHours = sessions.length > 0 ? recalcTotal(sessions) : null;

    const record = await attendanceModel.findOneAndUpdate(
      { employeeId, date },
      { status, sessions, totalWorkHours },
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
    const { id }                   = req.params;
    const { status, sessions }     = req.body;

    const record = await attendanceModel.findById(id);
    if (!record) return res.status(404).json({ message: 'Attendance record not found' });

    if (status)   record.status   = status;
    if (sessions) {
      record.sessions       = sessions;
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
    const { id }   = req.params;
    const record   = await attendanceModel.findByIdAndDelete(id);
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