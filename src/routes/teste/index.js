const express = require("express"); // Importa o módulo Express para criar rotas e servidores
const router = express.Router(); // Cria uma instância do roteador, usado para definir as rotas

// Define a rota GET para testar a API
// Essa rota responde a requisições GET na URL '/api/v1/test' (quando configurada no arquivo principal de rotas)
router.get("/", (req, res) => {
  // Responde com um JSON contendo uma mensagem de teste
  res.json([{ response: "API de teste funcionando!" }]);
});

module.exports = router; // Exporta o roteador para que ele possa ser utilizado em outros arquivos
