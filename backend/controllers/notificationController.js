const Notification = require("../models/Notification");

// Obter notificações de um usuário
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao obter notificações");
  }
};

// Criar uma nova notificação
const createNotification = async (req, res) => {
  try {
    const { userId, message } = req.body;

    const newNotification = new Notification({
      userId,
      message,
      isRead: false,
      createdAt: new Date(),
    });

    await newNotification.save();
    res.status(201).json(newNotification);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar notificação");
  }
};

// Marcar uma notificação como lida
const markAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).send("Notificação não encontrada");
    }

    notification.isRead = true;
    await notification.save();

    res.json(notification);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao marcar notificação como lida");
  }
};

module.exports = { getNotifications, createNotification, markAsRead };
