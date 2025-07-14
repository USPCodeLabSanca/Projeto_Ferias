// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
const PORT = 3000; // Define a porta em que o servidor vai rodar

// Cria uma rota GET simples para a raiz do site ("/")
app.get('/', (req, res) => {
  res.send('Minha primeira API do CodeLab está no ar!');
});

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
