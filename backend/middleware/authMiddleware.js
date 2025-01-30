const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Certifique-se de importar o modelo User

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      
      if (!token) {
        return res.status(401).json({ message: 'Não autorizado, token não fornecido' });
      }

      // Verificar e decodificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Buscar o usuário autenticado sem a senha
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      req.user = user;
      next();
    } catch (err) {
      console.error('Erro na autenticação:', err);
      res.status(401).json({ message: 'Token inválido ou expirado' });
    }
  } else {
    res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  }
};

module.exports = { protect };
