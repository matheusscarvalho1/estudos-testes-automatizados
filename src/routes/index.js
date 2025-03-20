const express = require("express"); // Importa o módulo Express, que facilita o trabalho com o servidor HTTP e rotas
const router = express.Router(); // Cria uma instância de roteador do Express, usado para definir as rotas
const userRoutes = require("./users"); // Importa as rotas de usuários do arquivo 'users.js'
const testeRoutes = require("./teste"); // Importa as rotas de testes do arquivo 'teste.js'

// Define a rota base para usuários
// Quando a URL começa com '/api/v1/users', a requisição será encaminhada para as rotas definidas em 'users.js'
router.use("/api/v1/users", userRoutes);

// Define a rota base para testes
// Quando a URL começa com '/api/v1/test', a requisição será encaminhada para as rotas definidas em 'teste.js'
router.use("/api/v1/test", testeRoutes);

module.exports = router; // Exporta o roteador para ser utilizado no arquivo principal do servidor
