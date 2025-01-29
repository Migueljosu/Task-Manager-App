const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['to-do', 'in-progress', 'completed'],
    default: 'to-do',
  },
  projectId: { // Relacionamento com o projeto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true,
  },
  assignedTo: { // Relacionamento com o usuário atribuído
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  comments: [{ // Lista de comentários da tarefa
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  }],
  history: [{ // Histórico de status da tarefa
    status: {
      type: String,
      enum: ['to-do', 'in-progress', 'completed'],
      required: true,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  }],
}, {
  timestamps: true, // Registra data de criação e atualização da tarefa
});

module.exports = mongoose.model('Task', taskSchema);
