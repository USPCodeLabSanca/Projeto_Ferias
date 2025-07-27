const express = require('express');
const app = express();
const nomeRoutes = require('./route/nomes');

app.use(express.json());

// Rotas
app.use('/', nomeRoutes);

module.exports = app; // Exporta o app para o server usar
