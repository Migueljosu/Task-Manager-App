const Task = require("../models/Task");

// Listar tarefas
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Erro ao listar tarefas" });
  }
};

// Criar tarefa
const createTask = async (req, res) => {
  const { title, description, assigneeId, projectId } = req.body;
  try {
    const newTask = new Task({ title, description, assigneeId, projectId });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar tarefa" });
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
