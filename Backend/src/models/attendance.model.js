/**
 * File: attendance.model.js
 * Description: Mongoose schema and model for employee attendance records, supporting multi-session daily tracking.
 * Why: To store structured attendance data per employee per day, enabling check-in/out sessions and work hour calculations.
 */

const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  checkIn:   { type: String, required: true },
  checkOut:  { type: String, default: null },
  workHours: { type: String, default: null },
}, { _id: true });

const attendanceSchema = new mongoose.Schema({

  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },

  date: {
    type: String,
    required: true
  },

  // Shift must match the user model's enum exactly
  shift: {
    type: String,
    enum: ['Morning', 'Evening', ''],
    default: ''
  },

  // Array of check-in/check-out sessions for the day
  sessions: [sessionSchema],

  // Total work hours across all sessions e.g. "9h 30m"
  totalWorkHours: {
    type: String,
    default: null
  },

  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave'],
    default: 'Absent'
  }

}, { timestamps: true });

// One record per employee per day
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

const attendanceModel = mongoose.model('attendance', attendanceSchema);

module.exports = attendanceModel;