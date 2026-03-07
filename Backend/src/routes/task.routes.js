const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// ═══════════════════════════════════════════════════════════════════════════════
//  TASK ROUTES  →  /api/tasks/...
// ═══════════════════════════════════════════════════════════════════════════════

// POST   /api/tasks/         → Admin assigns a new task
router.post('/', verifyToken, verifyAdmin, taskController.createTask);

// GET    /api/tasks/all      → Admin view all tasks
router.get('/all', verifyToken, verifyAdmin, taskController.getAllTasks);

// GET    /api/tasks/my       → Employee view own tasks
router.get('/my', verifyToken, taskController.getMyTasks);

// PUT    /api/tasks/:id      → Update task status
router.put('/:id', verifyToken, taskController.updateTaskStatus);

// DELETE /api/tasks/:id      → Admin delete a task
router.delete('/:id', verifyToken, verifyAdmin, taskController.deleteTask);

// PUT    /api/tasks/edit/:id → Admin edit task details & assignees
router.put('/edit/:id', verifyToken, verifyAdmin, taskController.editTask);

module.exports = router;
