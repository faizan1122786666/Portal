// const express = require('express');
// const authController = require('../controllers/auth.controller');
// const router = express.Router();



// router.post('/register',authController.registerUser);
// router.post('/login',authController.LoginUser)
// router.post('/change-password',authController.ChangePassword)



// module.exports = router;










const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { verifyToken } = require('../middleware/auth.middleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.loginUser);

// ✅ verifyToken middleware runs first, then changePassword
router.post('/change-password', verifyToken, authController.changePassword);

module.exports = router;