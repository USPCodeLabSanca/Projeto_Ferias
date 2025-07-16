import express from "express"
import NomesController from "../controllers/nomesController.js";

// Guarda e manipula as rotas
const routes = express.Router();

// Gera e retorna um nome de CodeLab incorreto.
routes.get("/nomes/aleatorio", NomesController.gerarNomeErrado);

// Recebe um nome e diz se ele é valido.
routes.post("/verificar", NomesController.verificarNome);

// Adiciona uma nova versão "correta" do nome do CodeLab.
routes.post("/nomes/validos", NomesController.adicionarNomeValido);

export default routes;