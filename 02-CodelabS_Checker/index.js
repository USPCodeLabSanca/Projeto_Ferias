const express = require('express');
const app = express();
const PORT = 3000;

// Middleware pra aceitar JSON no corpo das requisições
app.use(express.json());

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('Minha primeira API do CodeLab está no ar!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});