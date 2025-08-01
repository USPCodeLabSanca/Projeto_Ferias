const express = require('express');
const app = express();
const PORT = 3000;

const fs = require('fs');

// Middleware pra aceitar JSON no corpo das requisições
app.use(express.json());

// Rota básica de teste
app.get('/', (req, res) => {
  res.send('Minha primeira API do CodeLab está no ar!');
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//rota para nomes aleatorios
app.get('/nomes/aleatorio', (req, res) => {
  const nomesErrados = JSON.parse(fs.readFileSync('erros.json'));

  const nomeAleatorio = nomesErrados[Math.floor(Math.random() * nomesErrados.length)];

  res.json({nome: nomeAleatorio});

});

//rota para  verificar se o nome é valido ou não
app.post('/verificar', (req, res) => {

  const nomeRecebido = req.body.nome;

  const validos = JSON.parse(fs.readFileSync('nomesValidos.json'));

  if(validos.includes(nomeRecebido)){
    res.json({valido: true});
  }else{
    const errosAntigos = JSON.parse(fs.readFileSync('erros.json'));

    errosAntigos.push(nomeRecebido);

    fs.writeFileSync('erros.json', JSON.stringify(errosAntigos, null, 2));

    res.json({valido: false});
  }

});