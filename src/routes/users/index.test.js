const request = require("supertest"); // Biblioteca para fazer requisições HTTP no teste
const express = require("express"); // Framework para configurar o servidor temporário
const userRoute = require("./index"); // Importa as rotas de usuário

// Configuração do servidor temporário para testes
const app = express();
app.use(express.json()); // Permite envio e recebimento de JSON
app.use("/", userRoute); // Usa as rotas de usuário para o servidor

describe("Rota de usuarios", () => {
  // Testa o endpoint para listar todos os usuários
  test("should list all users", async () => {
    const response = await request(app).get("/list"); // Envia requisição GET para /list

    expect(response.status).toBe(200); // Verifica se a resposta tem status 200 (OK)
    expect(response.body).toEqual({
      users: [
        { id: 1, name: "Igor" }, // Verifica se a resposta tem a lista de usuários esperada
        { id: 2, name: "João" },
      ],
    });
  });

  // Testa o endpoint para criar um novo usuário
  test("should create a new user", async () => {
    const newUser = { name: "Matheus" }; // Dados do novo usuário

    const response = await request(app).post("/create").send(newUser); // Envia requisição POST para criar usuário

    expect(response.status).toBe(201); // Verifica se a resposta tem status 201 (Criado)
    expect(response.body.message).toBe("Usuário criado com sucesso!"); // Verifica a mensagem de sucesso
    expect(response.body.user).toHaveProperty("id"); // Verifica se o usuário criado tem um ID
    expect(response.body.user.name).toBe(newUser.name); // Verifica se o nome do usuário está correto
  });

  // Testa o endpoint para atualizar um usuário
  test("should update an user", async () => {
    const createResponse = await request(app)
      .post("/create")
      .send({ name: "Igor" }); // Cria um usuário primeiro
    const userId = createResponse.body.user.id; // Recupera o ID do usuário criado

    const updatedUser = { name: "Matheus" }; // Dados para atualizar o nome

    const response = await request(app)
      .put(`/update/${userId}`)
      .send(updatedUser); // Envia requisição PUT para atualizar o usuário

    expect(response.status).toBe(200); // Verifica se a resposta tem status 200 (OK)
    expect(response.body.message).toBe(
      `Usuário com ID ${userId} atualizado com sucesso!`
    ); // Verifica a mensagem de sucesso

    expect(Number(response.body.user.id)).toBe(userId); // Verifica se o ID do usuário não mudou
    expect(response.body.user.name).toBe(updatedUser.name); // Verifica se o nome foi atualizado corretamente
  });

  // Testa o endpoint para apagar um usuário
  test("should delete an user", async () => {
    const createResponse = await request(app)
      .post("/create")
      .send({ name: "Igor" }); // Cria um usuário primeiro
    const userId = createResponse.body.user.id; // Recupera o ID do usuário criado

    const response = await request(app).delete(`/delete/${userId}`); // Envia requisição DELETE para apagar o usuário

    expect(response.status).toBe(200); // Verifica se a resposta tem status 200 (OK)
    expect(response.body.message).toBe(
      `Usuário com ID ${userId} apagado com sucesso!`
    ); // Verifica a mensagem de sucesso

    expect(response.body.message).toContain(userId.toString()); // Verifica se o ID está na mensagem
  });
});
