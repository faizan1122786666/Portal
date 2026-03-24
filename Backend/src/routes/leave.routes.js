/**
 * File: leave.routes.js
 * Description: Express router for employee self-service leave operations (apply, view, edit, cancel).
 * Why: To define the employee-facing leave API endpoints, all protected by the verifyToken middleware.
 */

const express = require('express');
const router  = express.Router();
const leaveController = require('../controllers/leave.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');



// POST   /api/leave/apply         → Submit a new leave request
router.post('/apply', verifyToken, leaveController.applyLeave);

// GET    /api/leave/my            → Get own leave history
//   ?status=Pending|Approved|Rejected
//   ?month=2026-02
router.get('/my', verifyToken, leaveController.getMyLeaves);

// PUT    /api/leave/:id           → Edit own PENDING leave request
router.put('/:id', verifyToken, leaveController.updateMyLeave);

// DELETE /api/leave/:id           → Cancel own PENDING leave request
router.delete('/:id', verifyToken, leaveController.deleteMyLeave);

module.exports = router;