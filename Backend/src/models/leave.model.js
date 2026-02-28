const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({

  // The employee who submitted the request
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  leaveType: {
    type: String,
    enum: ['Sick Leave', 'Annual Leave', 'Personal Leave', 'Emergency Leave', 'Maternity Leave', 'Paternity Leave', 'Unpaid Leave'],
    required: true
  },

  startDate: {
    type: String,   // "YYYY-MM-DD"
    required: true
  },

  endDate: {
    type: String,   // "YYYY-MM-DD"
    required: true
  },

  days: {
    type: Number,
    required: true,
    min: 1
  },

  reason: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending'
  },

  // Admin fills these when acting on the request
  adminComment: {
    type: String,
    default: ''
  },

  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: null
  },

  reviewedAt: {
    type: Date,
    default: null
  },

  // Date the employee applied (YYYY-MM-DD string, set server-side)
  appliedDate: {
    type: String,
    required: true
  }

}, { timestamps: true });

// Index for fast queries per employee
leaveSchema.index({ employeeId: 1, status: 1 });
leaveSchema.index({ startDate: 1, endDate: 1 });

const leaveModel = mongoose.model('leave', leaveSchema);

module.exports = leaveModel;