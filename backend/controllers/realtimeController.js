//realtimeController
const socketio = require("socket.io");
let io;

const initSocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log("Usuário conectado: " + socket.id);

    // Enviar notificação quando uma tarefa for criada
    socket.on("create-task", (task) => {
      io.emit("task-created", task);
    });

    // Enviar notificação quando uma tarefa for atualizada
    socket.on("update-task", (task) => {
      io.emit("task-updated", task);
    });

    // Enviar notificação quando um comentário for adicionado
    socket.on("comment-task", (task) => {
      io.emit("task-commented", task);
    });

    // Notificar quando o status do usuário mudar (online/offline)
    socket.on("user-status", (status) => {
      io.emit("user-status-changed", status);
    });

    // Desconectar usuário
    socket.on("disconnect", () => {
      console.log("Usuário desconectado: " + socket.id);
    });
  });
};

module.exports = { initSocket };
