// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

const protect = async (req, res, next) => {
  let token;

  // Verificar se o token está no cabeçalho da requisição
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extrair o token do cabeçalho
      token = req.headers.authorization.split(' ')[1];

      // Verificar o token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Adicionar o usuário autenticado ao objeto `req`
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      res.status(401).json({ message: 'Token inválido' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Não autorizado, token não fornecido' });
  }
};

module.exports = { protect };