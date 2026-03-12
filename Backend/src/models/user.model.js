/**
 * File: user.model.js
 * Description: Mongoose schema and model for the User entity, covering both employees and admins.
 * Why: To define the data structure for user accounts, including authentication credentials, role-based access, and profile metadata.
 */

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['employee', 'admin'],
        default: 'employee'
    },
    department: {
        type: String,
        default: ''
    },
    name: {
        type: String,
        default: '',
        maxlength: [14, 'Name cannot exceed 14 characters']
    },
    shift: {
        type: String,
        enum: ['Morning', 'Evening', ''],
        default: ''
    },
    salary: {
        type: Number,
        default: 0
    },
    designation: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    }
});

const userModel = mongoose.model('user', userSchema);

module.exports = userModel;