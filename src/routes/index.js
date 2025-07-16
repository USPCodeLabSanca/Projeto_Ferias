import express from "express";

import nomes from "./nomesRoutes.js"
import erros from "./errosRoutes.js";

const routes = (app) => {
  // Rota raiz, verifica se servidor está online
  app.route("/").get((req, res) => {
    res.status(200).json({
      mensagem: "API está online!",
      endpoints: {
        nomes: "/nomes/aleatorio",
        verificar: "/verificar",
        estatisticas: "/estatisticas/erros"
      }
    });
  });

  // Middleware para tratar JSON e 
  // registra as rotas de nomes e erros.
  app.use(express.json(), nomes, erros);
};

export default routes;