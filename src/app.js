const express = require('express');
const app = express();
const nomeRoutes = require('./route/nomes');

app.use(express.json());

app.use('/', nomeRoutes);

module.exports = app;
