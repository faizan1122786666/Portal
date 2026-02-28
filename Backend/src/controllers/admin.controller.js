// const userModel = require('../models/user.model');
// const bcrypt = require('bcryptjs');


// // ── GET all employees ─────────────────────────────────────────────────────────
// async function getEmployees(req, res) {
//     try {
//         const employees = await userModel.find({ role: 'employee' }).select('-password');
//         return res.status(200).json({
//             message: 'Employees fetched successfully',
//             employees
//         });
//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── POST: Add new employee ────────────────────────────────────────────────────
// async function addEmployee(req, res) {
//     try {
//         const { email, password, role = 'employee', department = '' } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ message: 'Email and password are required' });
//         }

//         const existingUser = await userModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Employee with this email already exists' });
//         }

//         const hash = await bcrypt.hash(password, 10);

//         const employee = await userModel.create({ email, password: hash, role, department });

//         return res.status(201).json({
//             message: 'Employee added successfully',
//             employee: {
//                 _id: employee._id,
//                 email: employee.email,
//                 role: employee.role,
//                 department: employee.department
//             }
//         });

//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── PUT: Update employee ──────────────────────────────────────────────────────
// async function updateEmployee(req, res) {
//     try {
//         const { id } = req.params;
//         const { email, password, role, department } = req.body;

//         const employee = await userModel.findById(id);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         if (email) {
//             const existing = await userModel.findOne({ email, _id: { $ne: id } });
//             if (existing) {
//                 return res.status(400).json({ message: 'Email already in use' });
//             }
//             employee.email = email;
//         }

//         if (password)            employee.password   = await bcrypt.hash(password, 10);
//         if (role)                employee.role       = role;
//         if (department !== undefined) employee.department = department;

//         await employee.save();

//         return res.status(200).json({
//             message: 'Employee updated successfully',
//             employee: {
//                 _id: employee._id,
//                 email: employee.email,
//                 role: employee.role,
//                 department: employee.department
//             }
//         });

//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// // ── DELETE: Remove employee ───────────────────────────────────────────────────
// async function deleteEmployee(req, res) {
//     try {
//         const { id } = req.params;

//         const employee = await userModel.findById(id);
//         if (!employee) {
//             return res.status(404).json({ message: 'Employee not found' });
//         }

//         if (employee.role === 'admin') {
//             return res.status(403).json({ message: 'Cannot delete admin accounts' });
//         }

//         await userModel.findByIdAndDelete(id);
//         return res.status(200).json({ message: 'Employee deleted successfully' });

//     } catch (error) {
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// }


// module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };











const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');


// ── GET all employees ─────────────────────────────────────────────────────────
async function getEmployees(req, res) {
    try {
        const employees = await userModel.find({ role: 'employee' }).select('-password');
        return res.status(200).json({
            message: 'Employees fetched successfully',
            employees
        });
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


// ── POST: Add new employee ────────────────────────────────────────────────────
async function addEmployee(req, res) {
    try {
        const { email, password, role = 'employee', department = '', name = '', shift = '' } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        if (name && name.length > 14) {
            return res.status(400).json({ message: 'Name cannot exceed 14 characters' });
        }

        if (shift && !['AM', 'PM', ''].includes(shift)) {
            return res.status(400).json({ message: 'Shift must be AM or PM' });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Employee with this email already exists' });
        }

        const hash = await bcrypt.hash(password, 10);

        const employee = await userModel.create({ email, password: hash, role, department, name, shift });

        return res.status(201).json({
            message: 'Employee added successfully',
            employee: {
                _id: employee._id,
                email: employee.email,
                role: employee.role,
                department: employee.department,
                name: employee.name,
                shift: employee.shift
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


// ── PUT: Update employee ──────────────────────────────────────────────────────
async function updateEmployee(req, res) {
    try {
        const { id } = req.params;
        const { email, password, role, department, name, shift } = req.body;

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

        if (shift !== undefined) {
            if (shift && !['AM', 'PM', ''].includes(shift)) {
                return res.status(400).json({ message: 'Shift must be AM or PM' });
            }
            employee.shift = shift;
        }

        if (password)                 employee.password   = await bcrypt.hash(password, 10);
        if (role)                     employee.role       = role;
        if (department !== undefined) employee.department = department;

        await employee.save();

        return res.status(200).json({
            message: 'Employee updated successfully',
            employee: {
                _id: employee._id,
                email: employee.email,
                role: employee.role,
                department: employee.department,
                name: employee.name,
                shift: employee.shift
            }
        });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


// ── DELETE: Remove employee ───────────────────────────────────────────────────
async function deleteEmployee(req, res) {
    try {
        const { id } = req.params;

        const employee = await userModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if (employee.role === 'admin') {
            return res.status(403).json({ message: 'Cannot delete admin accounts' });
        }

        await userModel.findByIdAndDelete(id);
        return res.status(200).json({ message: 'Employee deleted successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}


module.exports = { getEmployees, addEmployee, updateEmployee, deleteEmployee };