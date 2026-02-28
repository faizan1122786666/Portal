const leaveModel = require('../models/leave.model');
const userModel = require('../models/user.model');

// ── Helper: today as "YYYY-MM-DD" ─────────────────────────────────────────────
function getTodayDate() {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

// ── Helper: calculate days between two YYYY-MM-DD strings (inclusive) ─────────
function calcDays(startDate, endDate) {
  const start = new Date(startDate + 'T00:00:00');
  const end = new Date(endDate + 'T00:00:00');
  if (isNaN(start) || isNaN(end)) return 0;
  const diff = Math.round((end - start) / (1000 * 60 * 60 * 24)) + 1;
  return diff > 0 ? diff : 0;
}

const VALID_LEAVE_TYPES = [
  'Sick Leave', 'Annual Leave', 'Personal Leave',
  'Emergency Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave'
];


// ═══════════════════════════════════════════════════════════════════════════════
//  EMPLOYEE CONTROLLERS
// ═══════════════════════════════════════════════════════════════════════════════

// ── POST /api/leave/apply ─────────────────────────────────────────────────────
// Employee submits a new leave request
async function applyLeave(req, res) {
  try {
    const employeeId = req.user.id;
    const { leaveType, startDate, endDate, reason } = req.body;

    // --- Validation ---
    if (!leaveType || !startDate || !endDate || !reason) {
      return res.status(400).json({ message: 'leaveType, startDate, endDate, and reason are required' });
    }

    if (!VALID_LEAVE_TYPES.includes(leaveType)) {
      return res.status(400).json({ message: `Invalid leave type. Must be one of: ${VALID_LEAVE_TYPES.join(', ')}` });
    }

    const today = getTodayDate();
    if (startDate < today) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    if (endDate < startDate) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }

    const days = calcDays(startDate, endDate);
    if (days < 1) {
      return res.status(400).json({ message: 'Invalid date range' });
    }

    // Check for overlapping approved/pending leaves
    const overlap = await leaveModel.findOne({
      employeeId,
      status: { $in: ['Pending', 'Approved'] },
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (overlap) {
      return res.status(400).json({
        message: `You already have a ${overlap.status.toLowerCase()} leave request overlapping those dates (${overlap.startDate} to ${overlap.endDate})`
      });
    }

    const leave = await leaveModel.create({
      employeeId,
      leaveType,
      startDate,
      endDate,
      days,
      reason: reason.trim(),
      appliedDate: today,
      status: 'Pending',
      adminComment: ''
    });

    return res.status(201).json({
      message: 'Leave application submitted successfully',
      leave: await leave.populate('employeeId', '-password')
    });

  } catch (error) {
    console.error('ApplyLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/leave/my ─────────────────────────────────────────────────────────
// Employee gets their own leave history
// Optional query: ?status=Pending|Approved|Rejected  ?month=2026-02
async function getMyLeaves(req, res) {
  try {
    const employeeId = req.user.id;
    const { status, month } = req.query;

    const filter = { employeeId };
    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      filter.status = status;
    }
    if (month) {
      filter.startDate = { $regex: `^${month}` };
    }

    const leaves = await leaveModel
      .find(filter)
      .sort({ createdAt: -1 });

    const summary = {
      total: leaves.length,
      pending: leaves.filter(l => l.status === 'Pending').length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      rejected: leaves.filter(l => l.status === 'Rejected').length,
    };

    return res.status(200).json({ message: 'Leave records fetched', leaves, summary });

  } catch (error) {
    console.error('GetMyLeaves error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── PUT /api/leave/:id ────────────────────────────────────────────────────────
// Employee edits their OWN pending leave request
async function updateMyLeave(req, res) {
  try {
    const employeeId = req.user.id;
    const { id } = req.params;
    const { leaveType, startDate, endDate, reason } = req.body;

    const leave = await leaveModel.findById(id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    // Ownership check
    if (leave.employeeId.toString() !== employeeId) {
      return res.status(403).json({ message: 'You can only edit your own leave requests' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'You can only edit pending leave requests' });
    }

    // Validate new values
    const today = getTodayDate();
    const newStart = startDate || leave.startDate;
    const newEnd = endDate || leave.endDate;

    if (newStart < today) {
      return res.status(400).json({ message: 'Start date cannot be in the past' });
    }

    if (newEnd < newStart) {
      return res.status(400).json({ message: 'End date cannot be before start date' });
    }

    if (leaveType && !VALID_LEAVE_TYPES.includes(leaveType)) {
      return res.status(400).json({ message: 'Invalid leave type' });
    }

    // Overlap check (excluding self)
    const overlap = await leaveModel.findOne({
      _id: { $ne: id },
      employeeId,
      status: { $in: ['Pending', 'Approved'] },
      startDate: { $lte: newEnd },
      endDate: { $gte: newStart }
    });

    if (overlap) {
      return res.status(400).json({
        message: `Overlaps with an existing ${overlap.status.toLowerCase()} leave (${overlap.startDate} to ${overlap.endDate})`
      });
    }

    if (leaveType) leave.leaveType = leaveType;
    if (startDate) leave.startDate = startDate;
    if (endDate) leave.endDate = endDate;
    if (reason) leave.reason = reason.trim();
    leave.days = calcDays(leave.startDate, leave.endDate);

    await leave.save();

    return res.status(200).json({ message: 'Leave request updated successfully', leave });

  } catch (error) {
    console.error('UpdateMyLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── DELETE /api/leave/:id ─────────────────────────────────────────────────────
// Employee cancels their own pending leave request
async function deleteMyLeave(req, res) {
  try {
    const employeeId = req.user.id;
    const { id } = req.params;

    const leave = await leaveModel.findById(id);

    if (!leave) {
      return res.status(404).json({ message: 'Leave request not found' });
    }

    if (leave.employeeId.toString() !== employeeId) {
      return res.status(403).json({ message: 'You can only delete your own leave requests' });
    }

    if (leave.status !== 'Pending') {
      return res.status(400).json({ message: 'You can only delete pending leave requests' });
    }

    await leaveModel.findByIdAndDelete(id);

    return res.status(200).json({ message: 'Leave request deleted successfully' });

  } catch (error) {
    console.error('DeleteMyLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ═══════════════════════════════════════════════════════════════════════════════
//  ADMIN CONTROLLERS
// ═══════════════════════════════════════════════════════════════════════════════

// ── GET /api/admin/leave ──────────────────────────────────────────────────────
// Admin gets ALL leave requests (with employee info)
// Optional query: ?status=  ?employeeId=  ?month=2026-02
async function getAllLeaves(req, res) {
  try {
    const { status, employeeId, month } = req.query;

    const filter = {};
    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      filter.status = status;
    }
    if (employeeId) {
      filter.employeeId = employeeId;
    }
    if (month) {
      filter.startDate = { $regex: `^${month}` };
    }

    const rawLeaves = await leaveModel
      .find(filter)
      .populate('employeeId', '-password')   // include employee name, email, dept
      .sort({ createdAt: -1 });

    // Filter out orphaned leaves whose employee has been deleted
    const leaves = rawLeaves.filter(l => l.employeeId != null);

    const summary = {
      total: leaves.length,
      pending: leaves.filter(l => l.status === 'Pending').length,
      approved: leaves.filter(l => l.status === 'Approved').length,
      rejected: leaves.filter(l => l.status === 'Rejected').length,
    };

    return res.status(200).json({ message: 'All leave records fetched', leaves, summary });

  } catch (error) {
    console.error('GetAllLeaves error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/admin/leave/summary ──────────────────────────────────────────────
// Admin dashboard summary stats
async function getLeaveSummary(req, res) {
  try {
    // Only count leaves for users that still exist (exclude orphaned leaves from deleted users)
    const validEmployeeIds = await userModel.distinct('_id');

    const [total, pending, approved, rejected] = await Promise.all([
      leaveModel.countDocuments({ employeeId: { $in: validEmployeeIds } }),
      leaveModel.countDocuments({ employeeId: { $in: validEmployeeIds }, status: 'Pending' }),
      leaveModel.countDocuments({ employeeId: { $in: validEmployeeIds }, status: 'Approved' }),
      leaveModel.countDocuments({ employeeId: { $in: validEmployeeIds }, status: 'Rejected' }),
    ]);

    return res.status(200).json({ total, pending, approved, rejected });

  } catch (error) {
    console.error('GetLeaveSummary error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── GET /api/admin/leave/employee/:id ─────────────────────────────────────────
// Admin views one employee's full leave history
async function getEmployeeLeaves(req, res) {
  try {
    const { id } = req.params;
    const { month } = req.query;

    const employee = await userModel.findById(id).select('-password');
    if (!employee) return res.status(404).json({ message: 'Employee not found' });

    const filter = { employeeId: id };
    if (month) filter.startDate = { $regex: `^${month}` };

    const leaves = await leaveModel.find(filter).sort({ createdAt: -1 });

    return res.status(200).json({ message: 'Employee leave records fetched', employee, leaves });

  } catch (error) {
    console.error('GetEmployeeLeaves error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── PUT /api/admin/leave/:id/review ───────────────────────────────────────────
// Admin approves or rejects a leave request
// Body: { status: 'Approved' | 'Rejected', adminComment?: string }
async function reviewLeave(req, res) {
  try {
    const { id } = req.params;
    const { status, adminComment } = req.body;

    if (!status || !['Approved', 'Rejected'].includes(status)) {
      return res.status(400).json({ message: 'status must be "Approved" or "Rejected"' });
    }

    const leave = await leaveModel.findById(id).populate('employeeId', '-password');
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    if (leave.status !== 'Pending') {
      return res.status(400).json({
        message: `This leave has already been ${leave.status.toLowerCase()}`
      });
    }

    leave.status = status;
    leave.adminComment = adminComment ? adminComment.trim() : (status === 'Approved' ? 'Leave approved' : 'Leave rejected');
    leave.reviewedBy = req.user.id;
    leave.reviewedAt = new Date();

    await leave.save();

    return res.status(200).json({
      message: `Leave request ${status.toLowerCase()} successfully`,
      leave
    });

  } catch (error) {
    console.error('ReviewLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── PUT /api/admin/leave/:id ──────────────────────────────────────────────────
// Admin edits any leave record (status, dates, type, comment)
async function adminUpdateLeave(req, res) {
  try {
    const { id } = req.params;
    const { status, adminComment, leaveType, startDate, endDate, reason } = req.body;

    const leave = await leaveModel.findById(id);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });

    if (status && ['Pending', 'Approved', 'Rejected'].includes(status)) {
      leave.status = status;
      if (status !== 'Pending') {
        leave.reviewedBy = req.user.id;
        leave.reviewedAt = new Date();
      }
    }

    if (adminComment !== undefined) leave.adminComment = adminComment;
    if (leaveType && VALID_LEAVE_TYPES.includes(leaveType)) leave.leaveType = leaveType;
    if (startDate) leave.startDate = startDate;
    if (endDate) leave.endDate = endDate;
    if (reason) leave.reason = reason.trim();

    // Recalculate days if dates changed
    if (startDate || endDate) {
      leave.days = calcDays(leave.startDate, leave.endDate);
    }

    await leave.save();

    return res.status(200).json({ message: 'Leave record updated successfully', leave });

  } catch (error) {
    console.error('AdminUpdateLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


// ── DELETE /api/admin/leave/:id ───────────────────────────────────────────────
// Admin deletes a leave record entirely
async function adminDeleteLeave(req, res) {
  try {
    const { id } = req.params;
    const leave = await leaveModel.findByIdAndDelete(id);
    if (!leave) return res.status(404).json({ message: 'Leave request not found' });
    return res.status(200).json({ message: 'Leave record deleted successfully' });
  } catch (error) {
    console.error('AdminDeleteLeave error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}


module.exports = {
  // Employee
  applyLeave,
  getMyLeaves,
  updateMyLeave,
  deleteMyLeave,
  // Admin
  getAllLeaves,
  getLeaveSummary,
  getEmployeeLeaves,
  reviewLeave,
  adminUpdateLeave,
  adminDeleteLeave,
};