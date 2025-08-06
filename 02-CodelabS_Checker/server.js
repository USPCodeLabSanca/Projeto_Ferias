const express = require('express')
const fs = require('fs')
const path = require('path')
const app = express()
const PORT = 3000

const nomesPath = path.join(__dirname, 'nomes.json')
const logsPath = path.join(__dirname, 'logs.json')

const nomes = require("./nomes.json")
const logs = require("./logs.json")

const getRandomLetter = () => {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const index = Math.floor(Math.random() * alphabet.length);
  return alphabet[index];
}

const geraIncorreto = () => {
  randomName = nomes.valid_names[Math.floor(Math.random() * nomes.valid_names.length)];
  randomNameArray = randomName.split("");
  randomNameArray[Math.floor(Math.random() * randomNameArray.length)] = getRandomLetter()
  return randomNameArray.join("")
}

const salvarNomes = () => {
  try {
    fs.writeFileSync(nomesPath, JSON.stringify(nomes, null, 2))
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error)
  }
}
const salvarLogs = () => {
  try {
    fs.writeFileSync(logsPath, JSON.stringify(logs, null, 2))
  } catch (error) {
    console.error('Erro ao salvar arquivo:', error)
  }
}

app.use(express.json())

app.get('/nomes/aleatorio', (req, res) => {
  res.send(geraIncorreto())
})

app.post('/verificar', (req, res) => {
  const { nome } = req.body;
  if (nomes.valid_names.includes(nome)) {
    res.send("Válido")
  } else {
    res.send("Inválido")
    const erroExistente = logs.erros.find(erro => erro.nome === nome);
    if (erroExistente) {
        erroExistente.counter++
    } else {
      logs.erros.push({"nome": nome, "counter": 1})
    }
    salvarLogs();
  }
})

app.post('/nomes/validos', (req, res) => {
  const { nome } = req.body;
  
  if (!nomes.valid_names.includes(nome)) {
    nomes.valid_names.push(nome);
    salvarNomes();
    res.send("Usuário Adicionado")
  } else {
    res.send("Usuário já existe")
  }
})

app.get('/estatisticas/erros', (req, res) => {

  const ranking = [...logs.erros]
  ranking.sort((a, b) => b.counter - a.counter);

  res.json(ranking);
})

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`))