const cors = require("cors");

const express = require("express"); // Importa o módulo express para criar o servidor
const routes = require("./routes"); // Importa o arquivo routes.js, onde as rotas da aplicação estão definidas

const app = express(); // Cria uma instância do aplicativo express
const PORT = 3333; // Define a porta onde o servidor vai escutar as requisições

app.use(express.json()); // Middleware para processar o corpo das requisições em formato JSON
app.use(cors());

// Middleware para log de requisições
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // Exibe o método HTTP (GET, POST, etc) e a URL acessada
  next(); // Passa a requisição para o próximo middleware ou rota
});

// Usa as rotas definidas em routes.js
app.use(routes); // Conecta as rotas importadas de routes.js com o servidor

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`); // Exibe no console que o servidor foi iniciado
});
