const { Router } = require('express');

const { getRandomName } = require('./routes/getRandomName');

const router = Router();

router.get('/nomes/aleatorio', getRandomName);

module.exports = { router };
