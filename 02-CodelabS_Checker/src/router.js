const { Router } = require('express');

const { getRandomName } = require('./routes/getRandomName');
const { verifyName } = require('./routes/verifyName');
const { newValidName } = require('./routes/newValidName');

const router = Router();

router.get('/nomes/aleatorio', getRandomName);
router.post('/verificar', verifyName);
router.post('/nomes/validos', newValidName);

module.exports = { router };
