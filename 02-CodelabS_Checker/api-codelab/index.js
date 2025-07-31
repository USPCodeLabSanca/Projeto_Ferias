//Importações de express, arquivos e fs (ler e escrever em arquivos)
const express = require('express');
const nomesArq = require('./aleatorios.json');
const validosArq = require('./validos.json');
const errosArq = './erros.json'
const validosCaminho = './validos.json'
const fs = require('fs');

//Ativa o express na constante app e adiciona a porta 3000
const app = express();
const PORT = 3000;
app.use(express.json());

//Endpoint introdutoria
app.get('/', (req, res) => {

    res.send('Minha primeira API do Codelab está no ar!');

});

//Endpoint que pega um nome aleatorio de um arquivo
app.get('/nomes/aleatorio',(req, res) => {

    //Pega a lista de nomes
    const lista = nomesArq.aleatorios;

    //
    const indiceAleatorio = Math.floor(Math.random() * lista.length);
    const nome = lista[indiceAleatorio];

    res.json({ nome });
});

app.post('/verificar',(req, res) => {

    let erros =[];

    const {nome} = req.body;

    const nomeM = nome.toUpperCase();

    const ehValido = validosArq.validos.includes(nomeM);

    if(ehValido){
        console.log("Nome Válido");
    }
    else{
        
        const dados = fs.readFileSync(errosArq, 'utf-8');
        erros = JSON.parse(dados);
        erros.push(nome);
        fs.writeFileSync(errosArq, JSON.stringify(erros));
        console.log("Nome inválido");
    }
    res.json({ nome, valido: ehValido });
});

app.post('/nomes/validos',(req, res) => {

    const {nome} = req.body;
    const nomeM = nome.toUpperCase();
    const listaValidos = validosArq.validos;

    if(!listaValidos.includes(nomeM)){
        listaValidos.push(nomeM)
    }

    fs.writeFileSync(validosCaminho, JSON.stringify({validos: listaValidos}));

    res.json(listaValidos);
});

app.get('/estatisticas/erros', (req, res) => {

});


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});