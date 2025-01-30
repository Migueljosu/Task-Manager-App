const socketio = require("socket.io");
let io;

const initSocket = (server) => {
  io = socketio(server);

  io.on("connection", (socket) => {
    console.log("Usuário conectado: " + socket.id);

    // Enviar notificação quando uma tarefa for criada
    socket.on("create-task", (task) => {
      // Emitir evento de tarefa criada
      io.emit("task-created", task);
    });

    // Enviar notificação quando uma tarefa for atualizada
    socket.on("update-task", (task) => {
      // Emitir evento de tarefa atualizada
      io.emit("task-updated", task);
    });

    // Enviar notificação quando um comentário for adicionado
    socket.on("comment-task", (task) => {
      // Emitir evento de comentário na tarefa
      io.emit("task-commented", task);
    });

    // Notificar quando o status do usuário mudar (online/offline)
    socket.on("user-status", (status) => {
      // Emitir evento de mudança de status do usuário
      io.emit("user-status-changed", status);
    });

    // Notificar quando um projeto for criado
    socket.on("create-project", (project) => {
      // Emitir evento de projeto criado
      io.emit("project-created", project);
    });

    // Notificar quando um projeto for atualizado
    socket.on("update-project", (project) => {
      // Emitir evento de projeto atualizado
      io.emit("project-updated", project);
    });

    // Notificar quando um membro for convidado para um projeto
    socket.on("invite-member", (project) => {
      // Emitir evento de convite de membro no projeto
      io.emit("project-member-invited", project);
    });

    // Notificar quando um membro for removido de um projeto
    socket.on("remove-member", (project) => {
      // Emitir evento de remoção de membro no projeto
      io.emit("project-member-removed", project);
    });

    // Desconectar usuário
    socket.on("disconnect", () => {
      console.log("Usuário desconectado: " + socket.id);
    });
  });
};

// Função para enviar notificações específicas para o usuário
const sendNotificationToUser = (userId, message) => {
  io.to(userId).emit("notification", { message });
};

module.exports = { initSocket, sendNotificationToUser };
