const express = require('express');
const router = express.Router();
const nomeController = require('../controllers/nomesController')

// exemplo de rota
router.get('/nomes/aleatorio', nomeController.nomesAleatorios);
router.post('/verificar', nomeController.verificar);
router.post('/nomes/validos', nomeController.nomesValidos);

module.exports = router;