// Importa o framework Express
    const express = require('express');

// Cria uma instância do aplicativo Express
    const app = express();
    const PORT = 3000; // Define a porta em que o servidor vai rodar´

    app.use(express.json());

// Cria uma rota GET para pegar nome aleatório errado
    const { geradorDePalavras } = require('./geradorAleatorio.js');
    app.get('/nomes/aleatorio', (req, res) => {
        const codzlebs=geradorDePalavras();
        res.send(codzlebs);
});

//Cria uma rota POST para verificar se a grafia de codelab do usuário está correta
    const { verificaCorretos } = require('./verificaErros.js');
    app.get(`/verificar/:bob`, async (req, res)=>{
        const { bob } = req.params;
        const estaCorreto= await verificaCorretos(bob);
        res.send(estaCorreto);
    });

//Cria uma rota POST para adicionar uma nova grafia de codelab
    const { addCorreto } = require('./adicionarGrafiaCerta.js');
    app.get(`/nomes/validos/:bob`, async (req, res)=>{
        const { bob } = req.params;
        await addCorreto(bob);
        res.send("funcionou que é uma maravilha!");
    });

//Cria uma rota GET para ver estatisticas de erro
    const { leitorDeJSON } = require('./verificaErros.js');
    app.get(`/estatisticas/erros`, async (req, res)=>{
        const lista= await leitorDeJSON("erros.json");
        res.send(lista);
    });

// Inicia o servidor e o faz "ouvir" na porta definida
    app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    });