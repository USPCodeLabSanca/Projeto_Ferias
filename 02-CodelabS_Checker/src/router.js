const { Router } = require('express');

const { getRandomName } = require('./routes/getRandomName');
const { verifyName } = require('./routes/verifyName');

const router = Router();

router.get('/nomes/aleatorio', getRandomName);
router.post('/verificar', verifyName);

module.exports = { router };
