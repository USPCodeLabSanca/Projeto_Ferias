const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');
const fs = require('fs');

const nomesPath = path.join(__dirname, 'nomes.json')
const logsPath = path.join(__dirname, 'logs.json')

const nomes = require("./nomes.json")
const logs = require("./logs.json")

const letraAleatoria = () => {
  const alphabet= "abcdefghijklmnopqrstuvwxyz";
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
}

const geraPalavraIncorreta = () => {
  nomeRandom = nomes.nomesvalidos[Math.floor(Math.random() * nomes.nomesvalidos.length)];
  nomeRandomArray = nomeRandom.split("");
  nomeRandomArray[Math.floor(Math.random() * nomeRandomArray.length)] = letraAleatoria()
  return nomeRandomArray.join("")
} 

app.use(express.json())

app.get('/nomes/aleatorio', (req, res) => {
    res.send(geraPalavraIncorreta())
})


app.post('/checker', (req, res) => {
  const { nome } = req.body;
  if (nomes.nomesvalidos.includes(nome)) {
    res.send("Eh Dentro Fi");
  } else {
    res.send("Tá na lista não");
    const erroExistente = logs.erros.find(procurado => procurado.nome === nome)
    if (erroExistente) {
      erroExistente.counter++;
    } else {
      logs.erros.push({"nome": nome, "counter": 1})
    }
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2));
  }
});

app.post('/nomes/validos', (req, res) => {
  const { nome } = req.body;
  if (!nomes.nomesvalidos.includes(nome)) {
    nomes.nomesvalidos.push(nome);
    fs.writeFileSync(nomesPath, JSON.stringify(nomes, null, 2));
    res.send("O nome foi adicionado a lista");
  } else {
    res.send("Usuario já existe");
  }
});


app.get('/estatisticas', (req, res) => {
  const errorsList = [...logs.erros];
  errorsList.sort((a, b) => b.counter - a.counter)
  res.json(errorsList);
});
app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`))