const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Task title is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  assignedEmployees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Assigned employee is required']
  }],
  deadline: {
    type: Date,
    required: [true, 'Task deadline is required']
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending'
  }
}, { timestamps: true, collection: 'tasks' });

module.exports = mongoose.model('Task', taskSchema);
