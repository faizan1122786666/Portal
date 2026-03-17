/**
 * File: auth.controller.js
 * Description: Handles user authentication operations including registration, login, password change, and profile management.
 * Why: To encapsulate all auth business logic, keeping routes clean and testable.
 */

const userModel = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Function: LoginUser
 * Description: Validates credentials and issues a JWT cookie for authenticated sessions.
 * Why: To authenticate users and establish a secure session via HTTP-only cookies.
 */
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

/**
 * Function: LogoutUser
 * Description: Clears the authentication token cookie.
 * Why: To securely end a user's session and prevent further access.
 */
async function LogoutUser(req, res) {
    try {
        res.clearCookie("token");
        return res.status(200).json({ message: "User Logout Successfully" });
    } catch (error) {
        console.error('LOGOUT ERROR:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
}

/**
 * Function: ChangePassword
 * Description: Allows an authenticated user to change their password after verifying the old one.
 * Why: To provide a secure self-service password change flow.
 */
async function ChangePassword(req, res) {
    try {
        const { email, oldPassword, newPassword } = req.body;

        // Verify user exists by email
        const user = await userModel.findOne({ email });

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

/**
 * Function: updateProfile
 * Description: Updates the display name of an authenticated user.
 * Why: To allow users to personalize their profile information within defined constraints.
 */
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

/**
 * Function: uploadProfileImage
 * Description: Handles profile image upload and updates the user's profileImage field via Cloudinary.
 * Why: To give users a visual identity within the portal.
 */
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

module.exports = { LoginUser, LogoutUser, ChangePassword, updateProfile, uploadProfileImage };