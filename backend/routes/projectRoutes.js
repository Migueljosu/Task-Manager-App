const express = require("express");
const router = express.Router();
const {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  inviteMember,
  getMembers,
} = require("../controllers/projectController");

// Listar projetos
router.get("/projects", getProjects);

// Criar projeto
router.post("/projects", createProject);

// Buscar projeto por ID
router.get("/projects/:id", getProject);

// Atualizar projeto
router.put("/projects/:id", updateProject);

// Excluir projeto
router.delete("/projects/:id", deleteProject);

// Listar membros do projeto
router.get("/projects/:id/members", getMembers);

// Convidar membro para o projeto
router.post("/projects/:id/invite", inviteMember);

module.exports = router;
