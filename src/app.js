import express from "express";
import NomesController from "./controllers/nomesController.js"; 
import ErrosController from "./controllers/errosController.js";


// Inicializa um servidor express
const app = express();

// Middleware (Ajuda a aceitar o formato JSON)
app.use(express.json());

// Gera e retorna um nome de CodeLab incorreto.
app.get("/nomes/aleatorio", NomesController.gerarNomeErrado);

// Recebe um nome e diz se ele é valido.
app.post("/verificar", NomesController.verificarNome);

// Adiciona uma nova versão "correta" do nome do CodeLab.
app.post("/nomes/validos", NomesController.adicionarNomeValido);

// Retorna uma lista dos nomes errados que os usuários mais tentaram validar.
app.get("/estatisticas/erros", ErrosController.gerarListaErros);

// Rota raiz, verifica se servidor está online
app.get('/', (req, res) => {
  res.status(200).json({
    mensagem: "API está online!",
    endpoints: {
      nomes: "/nomes/aleatorio",
      verificar: "/verificar",
      estatisticas: "/estatisticas/erros"
    }
  });
});

export default app;