/**
 * File: Project.js
 * Description: Mongoose schema and model for projects, including embedded task sub-documents and a virtual taskCount summary.
 * Why: To manage project-level entities with nested tasks, allowing admins to track progress via status and priority fields.
 */

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 60,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    assignedTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Pending', 'In Progress', 'Completed'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 50,
    },
    description: {
      type: String,
      trim: true,
      default: '',
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    deadline: {
      type: Date,
      required: true,
    },
    priority: {
      type: String,
      enum: ['Low', 'Medium', 'High', 'Urgent'],
      default: 'Medium',
    },
    status: {
      type: String,
      enum: ['Planning', 'Active', 'On Hold', 'Completed'],
      default: 'Planning',
    },
    tasks: [taskSchema],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  },
  { timestamps: true }
);

projectSchema.virtual('taskCount').get(function () {
  const tasks = this.tasks || [];
  return {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
  };
});

projectSchema.set('toObject', { virtuals: true });
projectSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);