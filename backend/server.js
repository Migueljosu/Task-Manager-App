// Importações
const express = require("express");
const connectDB = require("./config/db"); // Conexão com o MongoDB
const taskRoutes = require("./routes/taskRoutes"); // Rotas de tarefas
const userRoutes = require("./routes/userRoutes"); // Rotas de usuários
const authRoutes = require("./routes/authRoutes"); // Rotas de autenticação
const projectRoutes = require("./routes/projectRoutes"); // Rotas de projetos
const notificationRoutes = require("./routes/notificationRoutes"); // Rotas de notificações
const { initSocket } = require("./controllers/realtimeController"); // WebSockets
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const xss = require("xss-clean"); // Proteção contra XSS
const mongoSanitize = require("express-mongo-sanitize"); // Proteção contra injeção NoSQL

// Inicialização do aplicativo Express
const app = express();
const server = http.createServer(app);

// Configurações do CORS
const corsOptions = {
  origin: ["http://localhost:3000", "https://meusite.com"], // Domínios permitidos
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Configuração do Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Máximo de 100 requisições por IP
  message: "Muitas requisições, tente novamente mais tarde.",
  standardHeaders: true,
  legacyHeaders: false,
});

// Middleware de segurança
app.use(limiter); // Limitação de requisições
app.use(bodyParser.json()); // Análise do corpo da requisição em JSON
app.use(helmet()); // Proteção com cabeçalhos de segurança
app.use(cors(corsOptions)); // Habilitar CORS com as configurações definidas
app.use(xss()); // Proteção contra XSS
app.use(mongoSanitize()); // Proteção contra injeção NoSQL

// Conectar ao banco de dados MongoDB
connectDB();

// Rotas de API
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
