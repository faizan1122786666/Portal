



const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');
const { upload } = require('../utils/cloudinary');

router.post('/register', authController.registerUser);
router.post('/login', authController.LoginUser);
router.post('/change-password', verifyToken, authController.ChangePassword);
router.put('/update-profile', verifyToken, authController.updateProfile);
router.post('/upload-profile-image', verifyToken, upload.single('profileImage'), authController.uploadProfileImage);

module.exports = router;