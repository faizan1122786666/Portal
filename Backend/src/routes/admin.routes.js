const express = require('express');
const router = express.Router();
const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized - No token provided"
            });
        }

        const jwt = require('jsonwebtoken');
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        
        if (decoded.role !== 'admin') {
            return res.status(403).json({
                message: "Forbidden - Admin access required"
            });
        }

        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
};

// Get all employees
router.get('/employees', isAdmin, async (req, res) => {
    try {
        const employees = await userModel.find({ role: 'employee' }).select('-password');
        
        res.status(200).json({
            message: "Employees fetched successfully",
            employees
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Add new employee
router.post('/employees', isAdmin, async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if employee already exists
        const existingEmployee = await userModel.findOne({ email });

        if (existingEmployee) {
            return res.status(400).json({
                message: "Employee with this email already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create employee
        const employee = await userModel.create({
            email,
            password: hashedPassword,
            role: 'employee'
        });

        res.status(201).json({
            message: "Employee added successfully",
            employee: {
                id: employee._id,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Update employee
router.put('/employees/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password } = req.body;

        const employee = await userModel.findById(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        // Update email if provided
        if (email) {
            employee.email = email;
        }

        // Update password if provided
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            employee.password = hashedPassword;
        }

        await employee.save();

        res.status(200).json({
            message: "Employee updated successfully",
            employee: {
                id: employee._id,
                email: employee.email,
                role: employee.role
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

// Delete employee
router.delete('/employees/:id', isAdmin, async (req, res) => {
    try {
        const { id } = req.params;

        const employee = await userModel.findByIdAndDelete(id);

        if (!employee) {
            return res.status(404).json({
                message: "Employee not found"
            });
        }

        res.status(200).json({
            message: "Employee deleted successfully"
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Server error"
        });
    }
});

module.exports = router;