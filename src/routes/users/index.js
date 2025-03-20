const express = require("express"); // Importa o módulo Express para poder usar suas funcionalidades
const router = express.Router(); // Cria uma instância do roteador Express, usado para definir as rotas

// Definição da rota GET para listar todos os usuários
// Essa rota responde a requisições GET no caminho '/api/v1/users/list'
router.get("/list", (req, res) => {
  // Responde com um JSON contendo uma lista de usuários
  // Aqui você pode substituir pelo banco de dados ou lógica de negócios
  const users = [
    { id: 1, name: "Igor" },
    { id: 2, name: "João" },
  ];
  res.status(200).json({ users });
});

// Definição da rota DELETE para excluir um usuário
// Essa rota responde a requisições DELETE no caminho '/api/v1/users/delete/:id'
router.delete("/delete/:id", (req, res) => {
  const { id } = req.params;

  // Aqui você pode incluir lógica para excluir o usuário do banco de dados
  if (!id) {
    return res.status(400).json({ error: "ID do usuário é necessário" });
  }

  // Simulação de exclusão bem-sucedida
  res
    .status(200)
    .json({ message: `Usuário com ID ${id} apagado com sucesso!` });
});

// Definição da rota POST para criar um novo usuário
// Essa rota responde a requisições POST no caminho '/api/v1/users/create'
router.post("/create", (req, res) => {
  const { name } = req.body;

  // Verifica se o nome foi fornecido
  if (!name) {
    return res.status(400).json({ error: "Nome do usuário é necessário" });
  }

  const newUser = {
    id: Date.now(), // Usando um ID único gerado por timestamp (no caso de não usar banco)
    name,
  };

  // Aqui você pode adicionar lógica para salvar o novo usuário no banco de dados.

  res.status(201).json({
    message: "Usuário criado com sucesso!",
    user: newUser,
  });
});

// Definição da rota PUT para atualizar informações de um usuário
// Essa rota responde a requisições PUT no caminho '/api/v1/users/update/:id'
router.put("/update/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Verifica se o nome foi fornecido para atualizar
  if (!name) {
    return res
      .status(400)
      .json({ error: "Nome do usuário é necessário para atualização" });
  }

  // Simulação de atualização (substituindo o nome do usuário)
  const updatedUser = {
    id,
    name,
  };

  // Aqui você pode adicionar lógica para atualizar o usuário no banco de dados.

  res.status(200).json({
    message: `Usuário com ID ${id} atualizado com sucesso!`,
    user: updatedUser,
  });
});

module.exports = router; // Exporta o roteador para que ele possa ser utilizado em outros arquivos, como em routes.js
