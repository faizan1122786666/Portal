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













const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const authRoutes = require('./routes/auth.routes');
const adminRoutes = require('./routes/admin.routes');
const attendanceRoutes = require('./routes/attendance.routes');
const leaveRoutes = require('./routes/leave.routes');       // ← NEW
const taskRoutes = require('./routes/task.routes');         // ← NEW

const app = express();
const uploadDir = path.join(__dirname, '../public/uploads/profile');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:5173',
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

// Employee tasks    →  /api/tasks/my, /api/tasks/:id/complete
app.use('/api/tasks', taskRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error('SERVER ERROR:', err);
    if (err.name === 'MulterError') {
        return res.status(400).json({ message: `Upload Error: ${err.message}` });
    }
    res.status(500).json({ message: err.message || 'Internal Server Error' });
});

module.exports = app;