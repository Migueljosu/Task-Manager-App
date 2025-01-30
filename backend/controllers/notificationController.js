const Notification = require("../models/Notification");

// Criar notificação
const createNotification = async (req, res) => {
  try {
    const { message } = req.body;
    const userId = req.user._id; // Obter o userId a partir do usuário autenticado

    const notification = new Notification({ userId, message });
    await notification.save();

    // Emitir notificação via WebSocket
    req.io.emit("receiveNotification", notification);

    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar notificação" });
  }
};

// Listar notificações de um usuário
const getUserNotifications = async (req, res) => {
  try {
    // Verifica se o usuário autenticado é o mesmo que está tentando acessar as notificações
    if (req.user._id.toString() !== req.params.userId) {
      return res
        .status(403)
        .json({ error: "Não autorizado a acessar essas notificações" });
    }

    const notifications = await Notification.find({
      userId: req.params.userId,
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notificações" });
  }
};

// Marcar notificação como lida
const markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    // Verifica se a notificação pertence ao usuário autenticado
    if (notification.userId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "Não autorizado a marcar essa notificação como lida" });
    }

    await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
    res.status(200).json({ message: "Notificação marcada como lida" });
  } catch (error) {
    res.status(500).json({ error: "Erro ao marcar notificação como lida" });
  }
};

module.exports = {
  getUserNotifications,
  createNotification,
  markNotificationAsRead,
};
