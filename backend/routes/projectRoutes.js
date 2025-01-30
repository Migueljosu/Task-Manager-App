const express = require("express");
const router = express.Router();
const { check } = require("express-validator"); // Importando para validação
const { protect } = require("../middleware/authMiddleware"); // Middleware de autenticação
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
router.get("/projects", protect, getProjects);

// Criar projeto (com validação de dados)
router.post(
  "/projects",
  protect,
  [
    check("name").not().isEmpty().withMessage("Nome do projeto é obrigatório"),
    check("description")
      .isLength({ min: 5 })
      .withMessage("Descrição deve ter pelo menos 5 caracteres"),
    check("ownerId")
      .not()
      .isEmpty()
      .withMessage("ID do proprietário é obrigatório"),
  ],
  createProject
);

// Buscar projeto por ID
router.get("/projects/:id", protect, getProject);

// Atualizar projeto (com validação de dados)
router.put(
  "/projects/:id",
  protect,
  [
    check("name")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Nome do projeto não pode estar vazio"),
    check("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Descrição deve ter pelo menos 5 caracteres"),
  ],
  updateProject
);

// Excluir projeto
router.delete("/projects/:id", protect, deleteProject);

// Listar membros do projeto
router.get("/projects/:id/members", protect, getMembers);

// Convidar membro para o projeto (com validação)
router.post(
  "/projects/:id/invite",
  protect,
  [
    check("userId").not().isEmpty().withMessage("ID do usuário é obrigatório"),
    check("role").not().isEmpty().withMessage("Função do membro é obrigatória"),
  ],
  inviteMember
);

module.exports = router;
