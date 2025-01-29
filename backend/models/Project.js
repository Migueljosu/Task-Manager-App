const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  ownerId: { // Relacionamento com o usuário que é o dono do projeto
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  members: [{ // Lista de membros, onde cada membro tem um 'userId' e 'role'
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    role: {
      type: String,
      enum: ['owner', 'member'],
      default: 'member',
    },
  }],
}, {
  timestamps: true, // Registra data de criação e atualização do projeto
});

module.exports = mongoose.model('Project', projectSchema);
