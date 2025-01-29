const express = require("express");
const connectDB = require("./config/db"); // Já importa a conexão do MongoDB
const taskRoutes = require("./routes/taskRoutes"); // Importar as rotas de tarefas
const userRoutes = require("./routes/userRoutes"); // Importar as rotas de usuários
const authRoutes = require("./routes/authRoutes"); // Importar as rotas de autenticação
const projectRoutes = require("./routes/projectRoutes"); // Importar as rotas de projetos
const notificationRoutes = require("./routes/notificationRoutes"); // Importar as rotas de notificações
const { initSocket } = require("./controllers/realtimeController"); // Iniciar WebSockets
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");

const app = express();
const server = http.createServer(app);

// Conectar ao banco de dados MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rotas
app.use("/api/auth", authRoutes); // Autenticação
app.use("/api", userRoutes); // Usuários
app.use("/api", projectRoutes); // Projetos
app.use("/api", taskRoutes); // Tarefas
app.use("/api/notifications", notificationRoutes); // Notificações

// Iniciar WebSocket
initSocket(server);

// Iniciar o servidor HTTP
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
