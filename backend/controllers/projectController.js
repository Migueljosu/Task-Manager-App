const { validationResult } = require("express-validator");
const Project = require("../models/Project");
const { io } = require("../controllers/realtimeController"); // Importando a instância do Socket.IO

// Listar todos os projetos
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar projetos" });
  }
};

// Criar novo projeto
const createProject = async (req, res) => {
  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, description, ownerId } = req.body;
  try {
    const newProject = new Project({ name, description, ownerId });
    await newProject.save();

    // Emitir o evento 'project-created' para todos os clientes conectados
    io.emit("project-created", newProject);

    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar projeto" });
  }
};

// Buscar projeto por ID
const getProject = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "members.userId"
    );
    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar projeto" });
  }
};

// Atualizar projeto
const updateProject = async (req, res) => {
  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedProject) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Emitir o evento 'project-updated' para todos os clientes conectados
    io.emit("project-updated", updatedProject);

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar projeto" });
  }
};

// Excluir projeto
const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    // Emitir o evento 'project-deleted' para todos os clientes conectados
    io.emit("project-deleted", deletedProject);

    res.status(200).json({ message: "Projeto excluído com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir projeto" });
  }
};

// Listar membros do projeto
const getMembers = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }
    res.status(200).json(project.members);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar membros" });
  }
};

// Convidar membro para o projeto
const inviteMember = async (req, res) => {
  // Verificar erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, role } = req.body;
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Projeto não encontrado" });
    }

    project.members.push({ userId, role });
    await project.save();

    // Emitir o evento 'member-invited' para todos os clientes conectados
    io.emit("member-invited", { projectId: project._id, userId, role });

    res.status(200).json({ message: "Membro convidado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao convidar membro" });
  }
};

module.exports = {
  getProjects,
  createProject,
  getProject,
  updateProject,
  deleteProject,
  getMembers,
  inviteMember,
};
