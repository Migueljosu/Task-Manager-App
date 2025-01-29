const express = require('express');
const router = express.Router();
const { getNotifications, createNotification, markAsRead } = require('../controllers/notificationController');

// Obter todas as notificações de um usuário
router.get('/:userId', getNotifications);

// Criar uma nova notificação
router.post('/', createNotification);

// Marcar notificação como lida
router.put('/:id/markAsRead', markAsRead);

module.exports = router;
