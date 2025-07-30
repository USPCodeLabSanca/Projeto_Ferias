//Importações de express, arquivos e fs (ler e escrever em arquivos)
const express = require('express');
const nomesArq = require('./aleatorios.json');
const validosArq = require('./validos.json');
const errosArq = require('./erros.json');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {

    res.send('Minha primeira API do Codelab está no ar!');

});

app.get('/nomes/aleatorio',(req, res) => {

    const lista = nomesArq.aleatorios;

    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    const nome = lista[indiceAleatorio];

    res.json({ nome });
});

app.post('/verificar',(req, res) => {

    const nome = req.body.nome.toUpperCase();

    const ehValido = validosArq.validos.includes(nome);
    const erros = errosArq

    if(ehValido){
        console.log("Nome Válido");
    }
    else{
        erros.push(nome);
        fs.writeFileSync(errosArq,JSON.stringify(erros));
        console.log("Nome inválido");
    }
    res.json({ nome , valido: ehValido });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});