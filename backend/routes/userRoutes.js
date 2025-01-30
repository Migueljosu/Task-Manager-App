const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  updateUserValidator,
  validateUserId,
} = require("../validators/userValidator");
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

// Listar usuários
router.get("/users", protect, getUsers);

// Buscar usuário por ID
router.get("/users/:id", protect, validateUserId, getUser);

// Atualizar usuário
router.put(
  "/users/:id",
  protect,
  validateUserId,
  updateUserValidator,
  updateUser
);

// Excluir usuário
router.delete("/users/:id", protect, validateUserId, deleteUser);

module.exports = router;
