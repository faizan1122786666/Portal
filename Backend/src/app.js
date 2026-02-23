// Server Create
const express = require('express');
const authRoutes = require('./routes/auth.routes');
const cookieParser = require('cookie-parser');
const adminRoutes = require('./routes/admin.routes');


const app = express();
app.use(express.json())
app.use(cookieParser())

// prefix /api/auth
app.use('/api/auth',authRoutes)

// prefix /api/admin
app.use('/api/admin',adminRoutes)


module.exports = app;