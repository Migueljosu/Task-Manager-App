const express = require('express');
const router = express.Router();
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');

// Listar usuários
router.get('/users', getUsers);

// Buscar usuário por ID
router.get('/users/:id', getUser);

// Atualizar usuário
router.put('/users/:id', updateUser);

// Excluir usuário
router.delete('/users/:id', deleteUser);

module.exports = router;
