const taskModel = require('../models/task.model');
const userModel = require('../models/user.model');

// ── Helper: sort/filter query builder ────────────────────────────────────────
function buildFilter(query) {
    const filter = {};
    if (query.employeeId) filter.assignedTo = query.employeeId;
    if (query.status) filter.status = query.status;
    if (query.priority) filter.priority = query.priority;
    return filter;
}

// ── ADMIN: GET all tasks ──────────────────────────────────────────────────────
// GET /api/admin/tasks   ?employeeId ?status ?priority
async function getAllTasks(req, res) {
    try {
        const filter = buildFilter(req.query);
        const tasks = await taskModel
            .find(filter)
            .populate('assignedTo', 'name email department')
            .populate('assignedBy', 'name email')
            .sort({ createdAt: -1 });
        return res.status(200).json({ message: 'Tasks fetched successfully', tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── ADMIN: GET tasks for one employee ─────────────────────────────────────────
// GET /api/admin/tasks/employee/:id
async function getEmployeeTasks(req, res) {
    try {
        const tasks = await taskModel
            .find({ assignedTo: req.params.id })
            .populate('assignedTo', 'name email')
            .populate('assignedBy', 'name email')
            .sort({ dueDate: 1 });
        return res.status(200).json({ message: 'Employee tasks fetched', tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── ADMIN: POST create task ───────────────────────────────────────────────────
// POST /api/admin/tasks
async function createTask(req, res) {
    try {
        const { assignedTo, title, description = '', priority = 'Medium', dueDate, adminNote = '' } = req.body;

        if (!assignedTo || !title || !dueDate) {
            return res.status(400).json({ message: 'assignedTo, title, and dueDate are required' });
        }

        // Make sure target is an employee
        const employee = await userModel.findById(assignedTo);
        if (!employee || employee.role !== 'employee') {
            return res.status(400).json({ message: 'Target user must be an existing employee' });
        }

        const task = await taskModel.create({
            assignedTo,
            assignedBy: req.user.id,
            title,
            description,
            priority,
            dueDate,
            adminNote
        });

        const populated = await task.populate([
            { path: 'assignedTo', select: 'name email department' },
            { path: 'assignedBy', select: 'name email' }
        ]);

        return res.status(201).json({ message: 'Task created successfully', task: populated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── ADMIN: PUT update task ────────────────────────────────────────────────────
// PUT /api/admin/tasks/:id
async function updateTask(req, res) {
    try {
        const { id } = req.params;
        const { title, description, priority, dueDate, status, adminNote, assignedTo } = req.body;

        const task = await taskModel.findById(id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        if (title !== undefined) task.title = title;
        if (description !== undefined) task.description = description;
        if (priority !== undefined) task.priority = priority;
        if (dueDate !== undefined) task.dueDate = dueDate;
        if (adminNote !== undefined) task.adminNote = adminNote;
        if (status !== undefined) {
            task.status = status;
            if (status === 'Completed' && !task.completedAt) task.completedAt = new Date();
            if (status !== 'Completed') task.completedAt = null;
        }
        if (assignedTo !== undefined) {
            const emp = await userModel.findById(assignedTo);
            if (!emp || emp.role !== 'employee') {
                return res.status(400).json({ message: 'Target must be an existing employee' });
            }
            task.assignedTo = assignedTo;
        }

        await task.save();

        const populated = await task.populate([
            { path: 'assignedTo', select: 'name email department' },
            { path: 'assignedBy', select: 'name email' }
        ]);

        return res.status(200).json({ message: 'Task updated successfully', task: populated });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── ADMIN: DELETE task ────────────────────────────────────────────────────────
// DELETE /api/admin/tasks/:id
async function deleteTask(req, res) {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        await taskModel.findByIdAndDelete(req.params.id);
        return res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── EMPLOYEE: GET my tasks ────────────────────────────────────────────────────
// GET /api/tasks/my
async function getMyTasks(req, res) {
    try {
        const tasks = await taskModel
            .find({ assignedTo: req.user.id })
            .populate('assignedBy', 'name email')
            .sort({ dueDate: 1 });
        return res.status(200).json({ message: 'My tasks fetched', tasks });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

// ── EMPLOYEE: PUT mark task complete ─────────────────────────────────────────
// PUT /api/tasks/:id/complete
async function markComplete(req, res) {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Ownership check: employee can only mark their own tasks
        if (task.assignedTo.toString() !== req.user.id) {
            return res.status(403).json({ message: 'You can only update your own tasks' });
        }

        if (task.status === 'Completed') {
            return res.status(400).json({ message: 'Task is already completed' });
        }

        task.status = 'Completed';
        task.completedAt = new Date();
        await task.save();

        return res.status(200).json({ message: 'Task marked as completed', task });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = {
    getAllTasks,
    getEmployeeTasks,
    createTask,
    updateTask,
    deleteTask,
    getMyTasks,
    markComplete
};
