const express = require('express');
const router = express.Router();
const { registerUser, loginUser, logoutUser } = require('../controllers/authController');
const { body } = require('express-validator');

// Middleware de validação para registro e login
const validateAuth = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('A senha deve ter pelo menos 6 caracteres')
];

// Registrar usuário
router.post('/register', validateAuth, registerUser);

// Login do usuário
router.post('/login', validateAuth, loginUser);

// Logout do usuário
router.post('/logout', logoutUser);

module.exports = router;
