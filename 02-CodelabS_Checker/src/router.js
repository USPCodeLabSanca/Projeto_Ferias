const { Router } = require('express');

const router = Router();

router.get('/', (_, res) => {
    res.send({ message: 'Welcome to the API!' });
});

module.exports = { router };
