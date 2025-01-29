const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'Please use a valid email address'],
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    default: 'avatar.png', // Valor padrão caso o avatar não seja fornecido
  },
}, {
  timestamps: true, // Registra data de criação e atualização do usuário
});

module.exports = mongoose.model('User', userSchema);
