
// Backend/routes/authRoutes.js
const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController');

const router = express.Router();

// Changed from '/signup' to '/register' to match frontend's authService.js
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;