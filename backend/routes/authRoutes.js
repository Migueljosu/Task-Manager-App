const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');

// Registrar usuário
router.post('/register', registerUser);

// Login do usuário
router.post('/login', loginUser);

// Logout do usuário
router.post('/logout', logoutUser);

module.exports = router;
