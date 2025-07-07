// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
const PORT = 3000; // Define a porta em que o servidor vai rodar´

//importa o palavras aleatórias
function randomInt(max){
    return Math.floor(Math.random()*max);
}

const USP= [`USP `, `USP`, ``];
const primeiraSilaba=[ `Co`, `Ko`, `Quo`, `Cô`, `Kô`, `Quô` ];
const segundaSilaba= [ `de`, `d`, `dí`, `di`, `des`, `dís`, `ds`, `dis`];
const spaceBar= [ ` `, ``];
const labs= [`Lab`, `Labs`, `Leb`, `Léb`, `Lebs`, `Lébs`, `lab`, `labs`, `leb`, `léb`, `lebs`, `lébs`];

function geradorDePalavras(){
    let codeLabFinal= '';
    
    codeLabFinal += USP[randomInt(USP.length)];           
    codeLabFinal += primeiraSilaba[randomInt(primeiraSilaba.length)]; 
    codeLabFinal += segundaSilaba[randomInt(segundaSilaba.length)];   
    codeLabFinal += spaceBar[randomInt(spaceBar.length)];             
    codeLabFinal += labs[randomInt(labs.length)];                     

    return codeLabFinal;
}

// Cria uma rota GET simples para a raiz do site
app.get('/nomes/aleatorio', (req, res) => {
    const palavra=geradorDePalavras();
    res.send(palavra);
});

// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});