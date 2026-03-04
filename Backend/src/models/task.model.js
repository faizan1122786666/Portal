const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    // The employee the task is assigned to
    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    // The admin who created/assigned the task
    assignedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },

    description: {
        type: String,
        trim: true,
        default: ''
    },

    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },

    dueDate: {
        type: String,   // "YYYY-MM-DD"
        required: true
    },

    status: {
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    },

    // Set by admin, visible to employee
    adminNote: {
        type: String,
        trim: true,
        default: ''
    },

    // Set when employee marks the task as Completed
    completedAt: {
        type: Date,
        default: null
    }

}, { timestamps: true });

// Fast queries per employee and status
taskSchema.index({ assignedTo: 1, status: 1 });
taskSchema.index({ dueDate: 1 });

const taskModel = mongoose.model('task', taskSchema);

module.exports = taskModel;
