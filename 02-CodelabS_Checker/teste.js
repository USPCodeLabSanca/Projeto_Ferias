const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Servidor Express funcionando!');
});

app.listen(PORT, () => {
    console.log(`Servidor de teste rodando em http://localhost:${PORT}`);
});