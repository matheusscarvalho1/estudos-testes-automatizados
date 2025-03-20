const request = require("supertest"); // Biblioteca para testar endpoints HTTP
const express = require("express"); // Framework para configurar o servidor temporário
const testRoute = require("./index"); // Importa as rotas para o arquivo de teste

// Configuração do servidor temporário para testes
const app = express();
app.use(express.json()); // Permite enviar e receber JSON nas requisições
app.use("/", testRoute); // Usa as rotas de teste no servidor

describe("Rota de Teste", () => {
  // Testa o endpoint raiz para verificar se retorna o código de status correto
  test("should be return status 200", async () => {
    const response = await request(app).get("/"); // Envia uma requisição GET para a raiz da API

    expect(response.status).toBe(200); // Verifica se a resposta tem o status 200 (OK), indicando que a API está funcionando corretamente
    expect(response.body).toEqual([{ response: "API de teste funcionando!" }]); // Verifica se o corpo da resposta contém a mensagem esperada
  });
});
