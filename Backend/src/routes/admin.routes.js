









const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const attendanceController = require('../controllers/attendance.controller');
const leaveController = require('../controllers/leave.controller');
const { verifyAdmin } = require('../middleware/auth.middleware');

// ── Employee CRUD ─────────────────────────────────────────────────────────────
// GET    /api/admin/employees
router.get('/employees', verifyAdmin, adminController.getEmployees);
// POST   /api/admin/employees
router.post('/employees', verifyAdmin, adminController.addEmployee);
// PUT    /api/admin/employees/:id
router.put('/employees/:id', verifyAdmin, adminController.updateEmployee);
// DELETE /api/admin/employees/:id
router.delete('/employees/:id', verifyAdmin, adminController.deleteEmployee);

// ── Attendance (specific routes BEFORE param routes) ─────────────────────────
// GET  /api/admin/attendance/today-summary
router.get('/attendance/today-summary', verifyAdmin, attendanceController.getTodaySummary);
// GET  /api/admin/attendance/employee/:id
router.get('/attendance/employee/:id', verifyAdmin, attendanceController.getEmployeeAttendance);
// GET  /api/admin/attendance  (?date, ?month, ?employeeId)
router.get('/attendance', verifyAdmin, attendanceController.getAllAttendance);
// POST /api/admin/attendance/mark
router.post('/attendance/mark', verifyAdmin, attendanceController.markAttendance);
// PUT  /api/admin/attendance/:id
router.put('/attendance/:id', verifyAdmin, attendanceController.updateAttendance);
// DELETE /api/admin/attendance/:id
router.delete('/attendance/:id', verifyAdmin, attendanceController.deleteAttendance);

// ── Leave Management ──────────────────────────────────────────────────────────
// GET  /api/admin/leave/summary                → Stats: total/pending/approved/rejected
router.get('/leave/summary', verifyAdmin, leaveController.getLeaveSummary);
// GET  /api/admin/leave/employee/:id           → One employee's full leave history
router.get('/leave/employee/:id', verifyAdmin, leaveController.getEmployeeLeaves);
// GET  /api/admin/leave                        → All leave requests (?status, ?employeeId, ?month)
router.get('/leave', verifyAdmin, leaveController.getAllLeaves);
// PUT  /api/admin/leave/:id/review             → Approve or Reject  { status, adminComment? }
router.put('/leave/:id/review', verifyAdmin, leaveController.reviewLeave);
// PUT  /api/admin/leave/:id                    → Full edit of any leave record
router.put('/leave/:id', verifyAdmin, leaveController.adminUpdateLeave);
// DELETE /api/admin/leave/:id                  → Delete a leave record
router.delete('/leave/:id', verifyAdmin, leaveController.adminDeleteLeave);

module.exports = router;