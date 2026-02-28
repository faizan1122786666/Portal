// // const express = require('express');
// // const router = express.Router();
// // const userModel = require('../models/user.model');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // // Middleware to verify admin token
// // const verifyAdmin = async (req, res, next) => {
// //     try {
// //         const token = req.cookies.token;

// //         if (!token) {
// //             return res.status(401).json({ message: 'Unauthorized - No token' });
// //         }

// //         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

// //         if (decoded.role !== 'admin') {
// //             return res.status(403).json({ message: 'Forbidden - Admin access only' });
// //         }

// //         req.user = decoded;
// //         next();
// //     } catch (error) {
// //         return res.status(401).json({ message: 'Unauthorized - Invalid token' });
// //     }
// // };

// // // GET all employees
// // router.get('/employees', verifyAdmin, async (req, res) => {
// //     try {
// //         const employees = await userModel.find({ role: 'employee' }).select('-password');
// //         return res.status(200).json({
// //             message: 'Employees fetched successfully',
// //             employees
// //         });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Internal Server Error' });
// //     }
// // });

// // // POST - Add new employee
// // router.post('/employees', verifyAdmin, async (req, res) => {
// //     try {
// //         const { email, password } = req.body;

// //         if (!email || !password) {
// //             return res.status(400).json({ message: 'Email and password are required' });
// //         }

// //         const existingUser = await userModel.findOne({ email });
// //         if (existingUser) {
// //             return res.status(400).json({ message: 'Employee with this email already exists' });
// //         }

// //         const hash = await bcrypt.hash(password, 10);
// //         const employee = await userModel.create({
// //             email,
// //             password: hash,
// //             role: 'employee'
// //         });

// //         return res.status(201).json({
// //             message: 'Employee added successfully',
// //             employee: {
// //                 _id: employee._id,
// //                 email: employee.email,
// //                 role: employee.role
// //             }
// //         });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Internal Server Error' });
// //     }
// // });

// // // PUT - Update employee
// // router.put('/employees/:id', verifyAdmin, async (req, res) => {
// //     try {
// //         const { id } = req.params;
// //         const { email, password } = req.body;

// //         const employee = await userModel.findById(id);
// //         if (!employee) {
// //             return res.status(404).json({ message: 'Employee not found' });
// //         }

// //         if (email) {
// //             // Check if email is already taken by another user
// //             const existing = await userModel.findOne({ email, _id: { $ne: id } });
// //             if (existing) {
// //                 return res.status(400).json({ message: 'Email already in use' });
// //             }
// //             employee.email = email;
// //         }

// //         if (password) {
// //             employee.password = await bcrypt.hash(password, 10);
// //         }

// //         await employee.save();

// //         return res.status(200).json({
// //             message: 'Employee updated successfully',
// //             employee: {
// //                 _id: employee._id,
// //                 email: employee.email,
// //                 role: employee.role
// //             }
// //         });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Internal Server Error' });
// //     }
// // });

// // // DELETE - Remove employee
// // router.delete('/employees/:id', verifyAdmin, async (req, res) => {
// //     try {
// //         const { id } = req.params;

// //         const employee = await userModel.findById(id);
// //         if (!employee) {
// //             return res.status(404).json({ message: 'Employee not found' });
// //         }

// //         if (employee.role === 'admin') {
// //             return res.status(403).json({ message: 'Cannot delete admin accounts' });
// //         }

// //         await userModel.findByIdAndDelete(id);

// //         return res.status(200).json({ message: 'Employee deleted successfully' });
// //     } catch (error) {
// //         return res.status(500).json({ message: 'Internal Server Error' });
// //     }
// // });

// // module.exports = router;
















// const express = require('express');
// const router = express.Router();
// const userModel = require('../models/user.model');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // ── Middleware: verify admin token ────────────────────────────────────────────
// const verifyAdmin = async (req, res, next) => {
//     try {
//         const token = req.cookies.token;
//         if (!token) return res.status(401).json({ message: 'Unauthorized - No token' });

//         const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
//         if (decoded.role !== 'admin') return res.status(403).json({ message: 'Forbidden - Admin access only' });

//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ message: 'Unauthorized - Invalid token' });
//     }
// };

// // ── GET all employees ─────────────────────────────────────────────────────────
// router.get('/employees', verifyAdmin, async (req, res) => {
//     try {
//         const employees = await userModel.find({ role: 'employee' }).select('-password');
//         return res.status(200).json({ message: 'Employees fetched successfully', employees });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // ── POST: Add new employee ────────────────────────────────────────────────────
// router.post('/employees', verifyAdmin, async (req, res) => {
//     try {
//         const { email, password, role = 'employee', department = '' } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }

//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Employee with this email already exists' });
//         }

//         const hash = await bcrypt.hash(password, 10);
//         const employee = await userModel.create({
//             email,
//             password: hash,
//             role,
//             department
//         });

//         return res.status(201).json({
//             message: 'Employee added successfully',
//             employee: {
//                 _id: employee._id,
//                 email: employee.email,
//                 role: employee.role,
//                 department: employee.department
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // ── PUT: Update employee ──────────────────────────────────────────────────────
// router.put('/employees/:id', verifyAdmin, async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { email, password, role, department } = req.body;

//         const employee = await userModel.findById(id);
//         if (!employee) return res.status(404).json({ message: 'Employee not found' });

//         if (email) {
//             const existing = await userModel.findOne({ email, _id: { $ne: id } });
//             if (existing) return res.status(400).json({ message: 'Email already in use' });
//             employee.email = email;
//         }

//         if (password)    employee.password   = await bcrypt.hash(password, 10);
//         if (role)        employee.role       = role;
//         if (department !== undefined) employee.department = department;

//         await employee.save();

//         return res.status(200).json({
//             message: 'Employee updated successfully',
//             employee: {
//                 _id: employee._id,
//                 email: employee.email,
//                 role: employee.role,
//                 department: employee.department
//             }
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// // ── DELETE: Remove employee ───────────────────────────────────────────────────
// router.delete('/employees/:id', verifyAdmin, async (req, res) => {
//     try {
//         const { id } = req.params;

//         const employee = await userModel.findById(id);
//         if (!employee) return res.status(404).json({ message: 'Employee not found' });

//         if (employee.role === 'admin') {
//             return res.status(403).json({ message: 'Cannot delete admin accounts' });
//         }

//         await userModel.findByIdAndDelete(id);
//         return res.status(200).json({ message: 'Employee deleted successfully' });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

// module.exports = router;









// const express = require('express');
// const router = express.Router();
// const adminController = require('../controllers/admin.controller');
// const { verifyAdmin } = require('../middleware/auth.middleware');

// // ✅ Clean and simple — just routes, no logic
// router.get('/employees',     verifyAdmin, adminController.getEmployees);
// router.post('/employees',    verifyAdmin, adminController.addEmployee);
// router.put('/employees/:id', verifyAdmin, adminController.updateEmployee);
// router.delete('/employees/:id', verifyAdmin, adminController.deleteEmployee);

// module.exports = router;








// const express = require('express');
// const router  = express.Router();
// const attendanceController = require('../controllers/attendance.controller');
// const { verifyAdmin } = require('../middleware/auth.middleware');

// // All routes require admin role (verifyAdmin checks JWT cookie + role)

// // GET  /api/admin/attendance              → All employees' records
// //   ?date=2026-01-27                      → filter by date
// //   ?month=2026-01                        → filter by month
// //   ?employeeId=xxx                       → filter by employee
// router.get('/attendance', verifyAdmin, attendanceController.getAllAttendance);

// // GET  /api/admin/attendance/today-summary → Today's present/absent/leave count
// router.get('/attendance/today-summary', verifyAdmin, attendanceController.getTodaySummary);

// // GET  /api/admin/attendance/employee/:id  → One employee's full history
// //   ?date=2026-01-27  or  ?month=2026-01
// router.get('/attendance/employee/:id', verifyAdmin, attendanceController.getEmployeeAttendance);

// // POST /api/admin/attendance/mark          → Manually mark attendance
// // Body: { employeeId, date, status, checkIn?, checkOut? }
// router.post('/attendance/mark', verifyAdmin, attendanceController.markAttendance);

// // PUT  /api/admin/attendance/:id           → Edit an existing record
// router.put('/attendance/:id', verifyAdmin, attendanceController.updateAttendance);

// // DELETE /api/admin/attendance/:id         → Delete a record
// router.delete('/attendance/:id', verifyAdmin, attendanceController.deleteAttendance);

// module.exports = router;














const express = require('express');
const router  = express.Router();
const adminController      = require('../controllers/admin.controller');
const attendanceController = require('../controllers/attendance.controller');
const { verifyAdmin }      = require('../middleware/auth.middleware');

// ── Employee CRUD ─────────────────────────────────────────────────────────────
// GET    /api/admin/employees
router.get('/employees',        verifyAdmin, adminController.getEmployees);
// POST   /api/admin/employees
router.post('/employees',       verifyAdmin, adminController.addEmployee);
// PUT    /api/admin/employees/:id
router.put('/employees/:id',    verifyAdmin, adminController.updateEmployee);
// DELETE /api/admin/employees/:id
router.delete('/employees/:id', verifyAdmin, adminController.deleteEmployee);

// ── Attendance (specific routes BEFORE param routes) ─────────────────────────
// GET  /api/admin/attendance/today-summary
router.get('/attendance/today-summary',    verifyAdmin, attendanceController.getTodaySummary);
// GET  /api/admin/attendance/employee/:id
router.get('/attendance/employee/:id',     verifyAdmin, attendanceController.getEmployeeAttendance);
// GET  /api/admin/attendance  (?date, ?month, ?employeeId)
router.get('/attendance',                  verifyAdmin, attendanceController.getAllAttendance);
// POST /api/admin/attendance/mark
router.post('/attendance/mark',            verifyAdmin, attendanceController.markAttendance);
// PUT  /api/admin/attendance/:id
router.put('/attendance/:id',              verifyAdmin, attendanceController.updateAttendance);
// DELETE /api/admin/attendance/:id
router.delete('/attendance/:id',           verifyAdmin, attendanceController.deleteAttendance);

module.exports = router;