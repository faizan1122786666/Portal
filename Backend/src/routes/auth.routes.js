/**
 * File: auth.routes.js
 * Description: Express router for authentication and profile management endpoints.
 * Why: To define the public and authenticated routes for user registration, login, password change, and profile operations.
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { upload } = require('../utils/cloudinary');

router.post('/login', authController.LoginUser);
router.post('/logout', authController.LogoutUser);
router.post('/change-password', authController.ChangePassword);
router.put('/update-profile', verifyToken, authController.updateProfile);
router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), authController.uploadProfileImage);

module.exports = router;