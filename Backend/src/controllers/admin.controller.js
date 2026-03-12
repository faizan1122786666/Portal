/**
 * File: admin.controller.js
 * Description: Handles admin-only CRUD operations for employee management.
 * Why: To let administrators create, read, update, and delete employee accounts from a central point.
 */

const userModel = require('../models/user.model');
const leaveModel = require('../models/leave.model');
const bcrypt = require('bcryptjs');

const VALID_SHIFTS = ['Morning', 'Evening', ''];

/**
 * Function: getEmployees
 * Description: Fetches all users (employees and admins) from the database, excluding passwords.
 * Why: To provide the admin panel with a full list of registered employees.
 */
async function getEmployees(req, res) {
    try {
        const employees = await userModel.find().select('-password');
        return res.status(200).json({ message: 'Employees fetched successfully', employees });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Function: addEmployee
 * Description: Creates a new employee account with validation for shift, name length, and email uniqueness.
 * Why: To allow admins to onboard new employees directly from the management panel.
 */
async function addEmployee(req, res) {
    try {
        const {
            email, password, role = 'employee', department = '',
            name = '', shift = '', salary = 0, designation = ''
        } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if (name && name.length > 14) {
            return res.status(400).json({ message: 'Name cannot exceed 14 characters' });
        }

        // Admins cannot have shifts
        const assignedShift = role === 'admin' ? '' : shift;

        if (assignedShift && !VALID_SHIFTS.includes(assignedShift)) {
            return res.status(400).json({ message: 'Shift must be Morning or Evening' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);
        const employee = await userModel.create({
            email, password: hash, role, department,
            name, shift: assignedShift, salary, designation
        });

        return res.status(201).json({
            message: 'Employee added successfully',
            employee: {
                _id: employee._id, email: employee.email, role: employee.role,
                department: employee.department, name: employee.name,
                shift: employee.shift, salary: employee.salary,
                designation: employee.designation
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Function: updateEmployee
 * Description: Updates specified fields of an existing employee record.
 * Why: To allow admin-side editing of employee details such as salary, role, designation, or password.
 */
async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const { email, password, role, department, name, shift, salary, designation } = req.body;

        const employee = await userModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (email) {
            const existing = await userModel.findOne({ email, _id: { $ne: id } });
            if (existing) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            employee.email = email;
        }

        if (name !== undefined) {
            if (name.length > 14) {
                return res.status(400).json({ message: 'Name cannot exceed 14 characters' });
            }
            employee.name = name;
        }

        // Determine effective role (may be changing)
        const effectiveRole = role || employee.role;

        if (shift !== undefined) {
            if (effectiveRole === 'admin') {
                employee.shift = '';
            } else {
                if (shift && !VALID_SHIFTS.includes(shift)) {
                    return res.status(400).json({ message: 'Shift must be Morning or Evening' });
                }
                employee.shift = shift;
            }
        }

        // If role is switching to admin, clear shift
        if (role && role === 'admin') {
            employee.shift = '';
        }

        if (password) {
            if (password.length > 20) {
                return res.status(400).json({ message: 'Password cannot exceed 20 characters' });
            }
            employee.password = await bcrypt.hash(password, 10);
        }
        if (role) employee.role = role;
        if (department !== undefined) employee.department = department;
        if (salary !== undefined) employee.salary = salary;
        if (designation !== undefined) employee.designation = designation;

        await employee.save();

        return res.status(200).json({
            message: 'Employee updated successfully',
            employee: {
                _id: employee._id, email: employee.email, role: employee.role,
                department: employee.department, name: employee.name,
                shift: employee.shift, salary: employee.salary,
                designation: employee.designation
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Function: deleteEmployee
 * Description: Deletes an employee account and cascades to remove their leave records.
 * Why: To remove departed employees while keeping data consistent, preventing orphaned leave records.
 */
async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;
        const employee = await userModel.findById(id);
        if (!employee) return res.status(404).json({ message: 'Employee not found' });
        if (employee.role === 'admin') return res.status(403).json({ message: 'Cannot delete admin accounts' });

        await leaveModel.deleteMany({ employeeId: id });
        await userModel.findByIdAndDelete(id);

        return res.status(200).json({ message: 'Employee deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };
