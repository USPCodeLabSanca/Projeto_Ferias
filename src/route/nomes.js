const express = require('express');
const router = express.Router();
const nomeController = require('../controllers/nomesController')

router.get('/nomes/aleatorio', nomeController.nomesAleatorios);
router.post('/verificar', nomeController.verificar);
router.post('/nomes/validos', nomeController.nomesValidos);
router.get('/estatisticas/erros', nomeController.estatisticasErros);

module.exports = router;