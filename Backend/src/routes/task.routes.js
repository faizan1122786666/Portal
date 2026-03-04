const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken } = require('../middleware/auth.middleware');

// ── Employee-facing routes (require only a valid login) ───────────────────────
// GET  /api/tasks/my          → My assigned tasks
router.get('/my', verifyToken, taskController.getMyTasks);

// PUT  /api/tasks/:id/complete → Mark a task as Completed
router.put('/:id/complete', verifyToken, taskController.markComplete);

module.exports = router;
