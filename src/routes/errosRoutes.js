import express from "express"
import ErrosController from "../controllers/errosController.js";

// Guarda e manipula as rotas
const routes = express.Router();

// Retorna uma lista dos nomes errados que os usuários mais tentaram validar.
routes.get("/estatisticas/erros", ErrosController.gerarListaErros);

export default routes;