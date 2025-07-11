import express from "express";

// Inicializa um servidor express
const app = express();

// Rota raiz, verifica se servidor está online
app.get('/', (req, res) => {
  res.status(200).json({
    message: "API está online!",
    endpoints: {
      nomes: "/nomes/aleatorio",
      verificar: "/verificar",
      estatisticas: "/estatisticas/erros"
    }
  });
});

export default app;