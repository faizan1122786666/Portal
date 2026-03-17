/**
 * File: projectRoutes.js
 * Description: Express router for all project and project-task CRUD operations, serving both admin and employee roles.
 * Why: To encapsulate project management logic, protect admin-only endpoints, and allow employees to view and update only their assigned tasks.
 */

const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const { verifyToken, verifyAdmin } = require('../middleware/auth.middleware');

// ═══════════════════════════════════════════════════════════════════
//  PROJECT ROUTES
// ═══════════════════════════════════════════════════════════════════

// GET  /api/projects          → All projects (admin only)
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const totalProjects = await Project.countDocuments();
    const totalPages = Math.ceil(totalProjects / limit);

    const projects = await Project.find()
      .populate('members', 'name email designation profileImage role')
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));
    
    console.log(`Fetched ${projects.length} projects for page ${page}`);

    const result = projects.map(p => {
      const obj = p.toObject();
      obj.taskCount = {
        total:      p.tasks.length,
        pending:    p.tasks.filter(t => t.status === 'Pending').length,
        inProgress: p.tasks.filter(t => t.status === 'In Progress').length,
        completed:  p.tasks.filter(t => t.status === 'Completed').length,
      };
      return obj;
    });

    res.json({
      projects: result,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProjects
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET  /api/projects/my       → Projects where the logged-in employee has assigned tasks
router.get('/my', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const filter = { 'tasks.assignedTo': userId };
    const totalProjects = await Project.countDocuments(filter);
    const totalPages = Math.ceil(totalProjects / limit);

    const projects = await Project.find(filter)
      .populate('members', 'name email designation profileImage')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const result = projects.map(p => {
      const obj = p.toObject();
      const myTasks = p.tasks.filter(t =>
        t.assignedTo.some(id => id.toString() === userId.toString())
      );
      obj.myTaskCount = {
        total:      myTasks.length,
        pending:    myTasks.filter(t => t.status === 'Pending').length,
        inProgress: myTasks.filter(t => t.status === 'In Progress').length,
        completed:  myTasks.filter(t => t.status === 'Completed').length,
      };
      return obj;
    });

    res.json({
      projects: result,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalProjects
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET  /api/projects/:id      → Single project (admin sees all, employee sees only if member)
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('members', 'name email designation profileImage role')
      .populate('createdBy', 'name email')
      .populate('tasks.assignedTo', 'name email designation profileImage');

    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (req.user.role === 'employee') {
      const isMember = project.members.some(m => m._id.toString() === req.user.id.toString());
      if (!isMember) return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/projects          → Create project (admin only)
router.post('/', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, members, deadline, priority, status } = req.body;
    if (!name?.trim()) return res.status(400).json({ message: 'Project name is required' });
    if (!deadline)     return res.status(400).json({ message: 'Deadline is required' });

    const project = await Project.create({
      name: name.trim(),
      description: description?.trim() || '',
      members: members || [],
      deadline,
      priority: priority || 'Medium',
      status: status || 'Planning',
      createdBy: req.user.id,
    });

    await project.populate('members', 'name email designation profileImage');
    res.status(201).json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT  /api/projects/:id      → Update project (admin only)
router.put('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { name, description, members, deadline, priority, status } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    if (name)                      project.name        = name.trim();
    if (description !== undefined) project.description = description.trim();
    if (members)                   project.members     = members;
    if (deadline)                  project.deadline    = deadline;
    if (priority)                  project.priority    = priority;
    if (status)                    project.status      = status;

    await project.save();
    await project.populate('members', 'name email designation profileImage');
    res.json({ project });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/projects/:id    → Delete project (admin only)
router.delete('/:id', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ═══════════════════════════════════════════════════════════════════
//  TASK ROUTES (nested under /api/projects/:projectId/tasks)
// ═══════════════════════════════════════════════════════════════════

// GET  /api/projects/:projectId/tasks  → Employees see only their tasks; admins see all
router.get('/:projectId/tasks', verifyToken, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId)
      .populate('tasks.assignedTo', 'name email designation profileImage');
    if (!project) return res.status(404).json({ message: 'Project not found' });

    let tasks = project.tasks;

    if (req.user.role === 'employee') {
      tasks = tasks.filter(t =>
        t.assignedTo.some(u => u._id.toString() === req.user.id.toString())
      );
    }

    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/projects/:projectId/tasks  → Add task to project (admin only)
router.post('/:projectId/tasks', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, assignedTo, deadline, priority } = req.body;
    if (!title?.trim())      return res.status(400).json({ message: 'Task title is required' });
    if (!deadline)           return res.status(400).json({ message: 'Deadline is required' });
    if (!assignedTo?.length) return res.status(400).json({ message: 'Assign to at least one member' });

    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    project.tasks.push({
      title: title.trim(),
      description: description?.trim() || '',
      assignedTo,
      deadline,
      priority: priority || 'Medium',
      status: 'Pending',
    });

    await project.save();
    await project.populate('tasks.assignedTo', 'name email designation profileImage');

    const newTask = project.tasks[project.tasks.length - 1];
    res.status(201).json({ task: newTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT  /api/projects/:projectId/tasks/:taskId  → Edit task details (admin only)
router.put('/:projectId/tasks/:taskId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const { title, description, assignedTo, deadline, priority, status } = req.body;
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (title       !== undefined) task.title       = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (assignedTo  !== undefined) task.assignedTo  = assignedTo;
    if (deadline    !== undefined) task.deadline    = deadline;
    if (priority    !== undefined) task.priority    = priority;
    if (status      !== undefined) task.status      = status;

    await project.save();
    await project.populate('tasks.assignedTo', 'name email designation profileImage');

    const updatedTask = project.tasks.id(req.params.taskId);
    res.json({ task: updatedTask });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/projects/:projectId/tasks/:taskId/status  → Employee updates their own task status
router.patch('/:projectId/tasks/:taskId/status', verifyToken, async (req, res) => {
  try {
    const { status } = req.body;
    const VALID = ['Pending', 'In Progress', 'Completed'];
    if (!VALID.includes(status)) return res.status(400).json({ message: 'Invalid status' });

    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    if (req.user.role === 'employee') {
      const isAssigned = task.assignedTo.some(id => id.toString() === req.user.id.toString());
      if (!isAssigned) return res.status(403).json({ message: 'Not assigned to this task' });
    }

    task.status = status;
    await project.save();

    res.json({ task, message: 'Status updated successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/projects/:projectId/tasks/:taskId  → Delete task (admin only)
router.delete('/:projectId/tasks/:taskId', verifyToken, verifyAdmin, async (req, res) => {
  try {
    const project = await Project.findById(req.params.projectId);
    if (!project) return res.status(404).json({ message: 'Project not found' });

    const task = project.tasks.id(req.params.taskId);
    if (!task) return res.status(404).json({ message: 'Task not found' });

    task.deleteOne();
    await project.save();

    res.json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;