// const mongoose = require('mongoose');

// const attendanceSchema = new mongoose.Schema({

//     // Which employee this record belongs to
//     employeeId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         required: true
//     },

//     // The date of this attendance record (stored as YYYY-MM-DD string for easy querying)
//     date: {
//         type: String,
//         required: true
//     },

//     checkIn: {
//         type: String,
//         default: null   // null means they haven't checked in
//     },

//     checkOut: {
//         type: String,
//         default: null   // null means they haven't checked out yet
//     },

//     // Calculated when employee checks out
//     workHours: {
//         type: String,
//         default: null
//     },

//     status: {
//         type: String,
//         enum: ['Present', 'Absent', 'Leave'],
//         default: 'Absent'
//     }

// }, { timestamps: true })

// // Compound index: one record per employee per day (prevents duplicates)
// attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true })

// const attendanceModel = mongoose.model('attendance', attendanceSchema)

// module.exports = attendanceModel;












// const mongoose = require('mongoose');

// const sessionSchema = new mongoose.Schema({
//   checkIn:   { type: String, required: true },
//   checkOut:  { type: String, default: null },
//   workHours: { type: String, default: null },
// }, { _id: true });

// const attendanceSchema = new mongoose.Schema({

//   employeeId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   },

//   date: {
//     type: String,
//     required: true
//   },

//   // Array of check-in/check-out sessions for the day
//   sessions: [sessionSchema],

//   // Total work hours across all sessions e.g. "9h 30m"
//   totalWorkHours: {
//     type: String,
//     default: null
//   },

//   status: {
//     type: String,
//     enum: ['Present', 'Absent', 'Leave'],
//     default: 'Absent'
//   }

// }, { timestamps: true });

// // One record per employee per day
// attendanceSchema.index({ employeeId: 1, date: 1 }, { unique: true });

// const attendanceModel = mongoose.model('attendance', attendanceSchema);

// module.exports = attendanceModel;









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

  // Shift chosen by the employee at clock-in time for this day
  shift: {
    type: String,
    enum: ['AM', 'PM', 'Night', ''],
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