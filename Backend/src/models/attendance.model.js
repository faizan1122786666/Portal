const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({

    // Which employee this record belongs to
    employeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    // The date of this attendance record (stored as YYYY-MM-DD string for easy querying)
    date: {
        type: String,
        required: true
    },

    checkIn: {
        type: String,
        default: null   // null means they haven't checked in
    },

    checkOut: {
        type: String,
        default: null   // null means they haven't checked out yet
    },

    // Calculated when employee checks out
    workHours: {
        type: String,
        default: null
    },

    status: {
        type: String,
        enum: ['Present', 'Absent', 'Leave'],
        default: 'Absent'
    }

}, { timestamps: true })

// Compound index: one record per employee per day (prevents duplicates)
attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true })

const attendanceModel = mongoose.model('attendance', attendanceSchema)

module.exports = attendanceModel;