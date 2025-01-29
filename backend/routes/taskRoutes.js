const express = require("express");
const router = express.Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  commentTask,
} = require("../controllers/taskController");

// Listar tarefas
router.get("/tasks", getTasks);

// Criar nova tarefa
router.post("/tasks", createTask);

// Buscar tarefa por ID
router.get("/tasks/:id", getTask);

// Atualizar tarefa
router.put("/tasks/:id", updateTask);

// Excluir tarefa
router.delete("/tasks/:id", deleteTask);

// Atribuir tarefa a um usuário
router.post("/tasks/:id/assign", assignTask);

// Comentar em uma tarefa
router.post("/tasks/:id/comment", commentTask);

module.exports = router;
