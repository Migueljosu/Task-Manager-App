const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware"); // Certifique-se de importar o middleware de proteção
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  commentTask,
} = require("../controllers/taskController");

// Listar tarefas - Acesso liberado (não precisa de autenticação)
router.get("/tasks", getTasks);

// Criar nova tarefa - Protegido, precisa de autenticação
router.post("/tasks", protect, createTask);

// Buscar tarefa por ID - Protegido, precisa de autenticação
router.get("/tasks/:id", protect, getTask);

// Atualizar tarefa - Protegido, precisa de autenticação
router.put("/tasks/:id", protect, updateTask);

// Excluir tarefa - Protegido, precisa de autenticação
router.delete("/tasks/:id", protect, deleteTask);

// Atribuir tarefa a um usuário - Protegido, precisa de autenticação
router.post("/tasks/:id/assign", protect, assignTask);

// Comentar em uma tarefa - Protegido, precisa de autenticação
router.post("/tasks/:id/comment", protect, commentTask);

module.exports = router;
