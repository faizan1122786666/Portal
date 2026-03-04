



const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.LoginUser);
router.post('/change-password', verifyToken, authController.ChangePassword);
router.put('/update-profile', verifyToken, authController.updateProfile);  // ← NEW

module.exports = router;