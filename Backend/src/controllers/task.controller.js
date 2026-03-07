const Task = require('../models/task.model');
const User = require('../models/user.model');

//  ADMIN: Create a new task (assign task)
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedEmployees, deadline } = req.body;

    if (!assignedEmployees || !Array.isArray(assignedEmployees) || assignedEmployees.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one employee must be assigned' });
    }

    // Validate all employees exist
    const employees = await User.find({ _id: { $in: assignedEmployees }, role: 'employee' });
    if (employees.length !== assignedEmployees.length) {
      return res.status(404).json({ success: false, message: 'One or more valid employees not found' });
    }

    const task = new Task({
      title,
      description,
      assignedEmployees,
      deadline
    });

    await task.save();
    res.status(201).json({ success: true, message: 'Task assigned successfully', task });
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//  ADMIN: Get all tasks
exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('assignedEmployees', 'name email designation profileImage')
      .sort({ createdAt: -1 });

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching all tasks:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//  EMPLOYEE: Get own tasks
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedEmployees: req.user.id })
      .populate('assignedEmployees', 'name email')
      .sort({ deadline: 1 }); // Sort by closest deadline

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error('Error fetching employee tasks:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//  BOTH: Update task status
exports.updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Pending', 'In Progress', 'Completed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Role check: If employee, ensure the task belongs to them. Admin can update any.
    if (req.user.role === 'employee' && !task.assignedEmployees.includes(req.user.id)) {
      return res.status(403).json({ success: false, message: 'Unauthorized to update this task' });
    }

    task.status = status;
    await task.save();

    res.status(200).json({ success: true, message: 'Task status updated', task });
  } catch (error) {
    console.error('Error updating task status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//  ADMIN: Delete a task
exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task deleted successfully' });
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

//  ADMIN: Edit task details & assigned employees
exports.editTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, assignedEmployees, deadline } = req.body;

    if (!assignedEmployees || !Array.isArray(assignedEmployees) || assignedEmployees.length === 0) {
      return res.status(400).json({ success: false, message: 'At least one employee must be assigned' });
    }

    const employees = await User.find({ _id: { $in: assignedEmployees }, role: 'employee' });
    if (employees.length !== assignedEmployees.length) {
      return res.status(404).json({ success: false, message: 'One or more valid employees not found' });
    }

    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, assignedEmployees, deadline },
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    res.status(200).json({ success: true, message: 'Task updated successfully', task });
  } catch (error) {
    console.error('Error editing task:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};
