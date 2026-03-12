/**
 * File: task.routes.js
 * Description: Express router for standalone task CRUD operations, separate from project-embedded tasks.
 * Why: To handle general task assignment (not project-specific), allowing admins to assign tasks directly to employees.
 * Note: PUT /edit/:id MUST be declared before PUT /:id to prevent Express from matching /edit as an ID param.
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// POST   /api/tasks/         → Admin assigns a new task
router.post('/', verifyToken, verifyAdmin, taskController.createTask);

// GET    /api/tasks/all      → Admin views all tasks
router.get('/all', verifyToken, verifyAdmin, taskController.getAllTasks);

// GET    /api/tasks/my       → Employee views own tasks
router.get('/my', verifyToken, taskController.getMyTasks);

// PUT    /api/tasks/edit/:id → Admin edits task details & assignees (must be before /:id)
router.put('/edit/:id', verifyToken, verifyAdmin, taskController.editTask);

// PUT    /api/tasks/:id      → Update task status (employee or admin)
router.put('/:id', verifyToken, taskController.updateTaskStatus);

// DELETE /api/tasks/:id      → Admin deletes a task
router.delete('/:id', verifyToken, verifyAdmin, taskController.deleteTask);

module.exports = router;
