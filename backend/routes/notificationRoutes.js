const express = require("express");
const { body, param, validationResult } = require("express-validator");
const router = express.Router();
const {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware"); // Middleware de autenticação

// Middleware para capturar erros de validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

// Obter todas as notificações de um usuário
router.get(
  "/:userId",
  protect,
  [
    param("userId").isMongoId().withMessage("ID de usuário inválido"), // Validação do userId
    handleValidationErrors,
  ],
  getUserNotifications
);

// Criar uma nova notificação
router.post(
  "/",
  protect,
  [
    body("message").notEmpty().withMessage("A mensagem é obrigatória"), // Validação da mensagem
    body("userId").isMongoId().withMessage("ID de usuário inválido"), // Validação do userId
    handleValidationErrors,
  ],
  createNotification
);

// Marcar notificação como lida
router.put(
  "/:id/read",
  protect,
  [
    param("id").isMongoId().withMessage("ID de notificação inválido"), // Validação do id da notificação
    handleValidationErrors,
  ],
  markNotificationAsRead
);

module.exports = router;
