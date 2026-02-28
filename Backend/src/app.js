// // Server Create
// const express = require('express');
// const authRoutes = require('./routes/auth.routes');
// const cookieParser = require('cookie-parser');
// const adminRoutes = require('./routes/admin.routes');
// const cors = require('cors')



// const app = express();
// app.use(express.json())
// app.use(cookieParser())


// app.use(cors({
//     origin : 'http://localhost:5173',   // Vite dev server
//     credentials: true                   // Allow cookies (JWT)
// }))

// // prefix /api/auth
// app.use('/api/auth',authRoutes)

// // prefix /api/admin
// app.use('/api/admin',adminRoutes)


// module.exports = app;






// const express     = require('express');
// const cookieParser = require('cookie-parser');
// const cors        = require('cors');

// const authRoutes       = require('./routes/auth.routes');
// const adminRoutes      = require('./routes/admin.routes');
// const attendanceRoutes = require('./routes/attendance.routes'); // ← NEW

// const app = express();

// app.use(express.json());
// app.use(cookieParser());

// app.use(cors({
//     origin:      'http://localhost:5173',
//     credentials: true
// }));

// // Auth routes  →  /api/auth/register, /api/auth/login, /api/auth/change-password
// app.use('/api/auth', authRoutes);

// // Admin routes →  /api/admin/employees, /api/admin/attendance/...
// app.use('/api/admin', adminRoutes);

// // Employee attendance  →  /api/attendance/checkin, /checkout, /my, /today-status
// app.use('/api/attendance', attendanceRoutes);

// module.exports = app;













const express      = require('express');
const cookieParser = require('cookie-parser');
const cors         = require('cors');

const authRoutes       = require('./routes/auth.routes');
const adminRoutes      = require('./routes/admin.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const leaveRoutes      = require('./routes/leave.routes');       // ← NEW

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin:      'http://localhost:5173',
    credentials: true
}));

// Auth routes       →  /api/auth/register, /api/auth/login, /api/auth/change-password
app.use('/api/auth', authRoutes);

// Admin routes      →  /api/admin/employees, /api/admin/attendance/..., /api/admin/leave/...
app.use('/api/admin', adminRoutes);

// Employee attendance → /api/attendance/checkin, /checkout, /my, /today-status
app.use('/api/attendance', attendanceRoutes);

// Employee leave    →  /api/leave/apply, /my, /:id
app.use('/api/leave', leaveRoutes);

module.exports = app;