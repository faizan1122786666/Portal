const express = require('express');
const router  = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// All routes require the employee to be logged in (verifyToken checks JWT cookie)

// POST /api/attendance/checkin  → Employee checks in
router.post('/checkin', verifyToken, attendanceController.checkIn);

// POST /api/attendance/checkout → Employee checks out
router.post('/checkout', verifyToken, attendanceController.checkOut);

// GET  /api/attendance/my       → Get own records
//   ?date=2026-01-27            → filter by date
//   ?month=2026-01              → filter by month
router.get('/my', verifyToken, attendanceController.getMyAttendance);

// GET  /api/attendance/today-status → Am I checked in/out today?
router.get('/today-status', verifyToken, attendanceController.getTodayStatus);

module.exports = router;