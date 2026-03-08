const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    try {
        const { email, password, role = "employee", name = '', shift = '' } = req.body;

        if (name && name.length > 14) {
            return res.status(400).json({ message: 'Name cannot exceed 14 characters' });
        }

        const isUserAlreadyExist = await userModel.findOne({ email });

        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "User already exist"
            });
        }

        const hash = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            email,
            password: hash,
            role,
            name,
            shift
        });

        const token = jwt.sign({
            id: user._id,
            role: user.role
        }, process.env.JWT_SECRET_KEY);

        res.cookie("token", token);

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                shift: user.shift,
                designation: user.designation || '',
                profileImage: user.profileImage || ''
            }
        });
    } catch (error) {
        console.error('REGISTER ERROR:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function LoginUser(req, res) {
    try {
        const { email, password } = req.body;
        console.log('LOGIN ATTEMPT:', email);

        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid Password"
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: "1h"
            }
        );

        res.cookie("token", token);

        return res.status(200).json({
            message: "User Login Successfully",
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name || '',
                shift: user.shift || '',
                designation: user.designation || '',
                profileImage: user.profileImage || ''
            }
        });
    } catch (error) {
        console.error('LOGIN ERROR:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function ChangePassword(req, res) {
    try {
        const { oldPassword, newPassword } = req.body;

        const user = await userModel.findById(req.user.id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        const isPasswordMatched = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordMatched) {
            return res.status(401).json({
                message: "Invalid Old Password"
            });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        return res.status(200).json({
            message: "Password changed successfully"
        });

    } catch (error) {
        console.error('CHANGE PASSWORD ERROR:', error);
        return res.status(500).json({
            message: "Internal Server Error"
        });
    }
}

async function updateProfile(req, res) {
    try {
        const { name } = req.body;

        if (name === undefined || name === null) {
            return res.status(400).json({ message: 'Name is required' });
        }

        if (name.length > 14) {
            return res.status(400).json({ message: 'Name cannot exceed 14 characters' });
        }

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name.trim();
        await user.save();

        return res.status(200).json({
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                shift: user.shift,
                designation: user.designation || '',
                profileImage: user.profileImage || ''
            }
        });

    } catch (error) {
        console.error('UPDATE PROFILE ERROR:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

async function uploadProfileImage(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await userModel.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.profileImage = req.file.path;
        await user.save();

        return res.status(200).json({
            message: 'Profile image uploaded successfully',
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                name: user.name,
                shift: user.shift,
                designation: user.designation || '',
                profileImage: user.profileImage
            }
        });

    } catch (error) {
        console.error('UPLOAD IMAGE ERROR:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

module.exports = { registerUser, LoginUser, ChangePassword, updateProfile, uploadProfileImage };