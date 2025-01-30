const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");
const { io } = require("../controllers/realtimeController"); // Importando a instância do Socket.IO

// Listar tarefas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tarefas" });
  }
};

// Criar tarefa (Apenas usuários autenticados podem criar)
const createTask = async (req, res) => {
  // Validação dos campos
  await body("title").notEmpty().withMessage("Título é obrigatório").run(req);
  await body("description")
    .isLength({ min: 5 })
    .withMessage("Descrição deve ter pelo menos 5 caracteres")
    .run(req);
  await body("projectId")
    .notEmpty()
    .withMessage("O ID do projeto é obrigatório")
    .run(req);

  // Captura erros de validação
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, assigneeId, projectId } = req.body;

    // Criar a nova tarefa vinculada ao usuário autenticado
    const newTask = new Task({
      title,
      description,
      assigneeId,
      projectId,
      createdBy: req.user.id, // ID do usuário autenticado
    });

    await newTask.save();

    // Emitir o evento 'task-created' para todos os clientes conectados
    io.emit("task-created", newTask);

    res
      .status(201)
      .json({ message: "Tarefa criada com sucesso!", task: newTask });
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa." });
  }
};

// Buscar tarefa por ID
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("assigneeId");
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar tarefa" });
  }
};

// Atualizar tarefa
const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedTask) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    // Emitir o evento 'task-updated' para todos os clientes conectados
    io.emit("task-updated", updatedTask);

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar tarefa" });
  }
};

// Excluir tarefa
const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }

    // Emitir o evento 'task-deleted' para todos os clientes conectados
    io.emit("task-deleted", deletedTask);

    res.status(200).json({ message: "Tarefa excluída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
};

// Atribuir tarefa a um usuário
const assignTask = async (req, res) => {
  const { assigneeId } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    task.assigneeId = assigneeId;
    await task.save();

    // Emitir o evento 'task-assigned' para todos os clientes conectados
    io.emit("task-assigned", task);

    res.status(200).json({ message: "Tarefa atribuída com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao atribuir tarefa" });
  }
};

// Comentar tarefa
const commentTask = async (req, res) => {
  const { comment } = req.body;
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ error: "Tarefa não encontrada" });
    }
    task.comments.push(comment);
    await task.save();

    // Emitir o evento 'task-commented' para todos os clientes conectados
    io.emit("task-commented", task);

    res.status(200).json({ message: "Comentário adicionado com sucesso" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao adicionar comentário" });
  }
};

module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  assignTask,
  commentTask,
};
