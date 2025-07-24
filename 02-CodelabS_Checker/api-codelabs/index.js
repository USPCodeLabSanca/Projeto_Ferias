// Importa o framework Express
const express = require('express');

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.json());
const PORT = 3000; // Define a porta em que o servidor vai rodar

// Módulo para interagir com arquivos
const fs = require('fs');


const caminhoValidos = "C:\\Users\\João Pedro Neves\\OneDrive\\Documentos\\BCC\\Code Labs\\Projeto_Ferias\\02-CodelabS_Checker\\api-codelabs\\validos.json";
const caminhoErros = "C:\\Users\\João Pedro Neves\\OneDrive\\Documentos\\BCC\\Code Labs\\Projeto_Ferias\\02-CodelabS_Checker\\api-codelabs\\erros.json";

function GeraNome(){
  let nome = [];
  let letra = [];
  const prLetra = ['C', 'K'];
  const sgLetra = ['o', 'u'];
  const trcLetra = ['d', 't'];
  const qrtLetra = ['e', 'i'];
  const qntLetra = ['L'];
  const sxtLetra = ['a', 'e'];
  const stmLetra = ['b'];
  const otvLetra = ['i', 's'];
  const nnaLetra = [' ', 's'];
  
  // Adiciona cada array de letras ao array principal 'letra'
  letra.push(prLetra);
  letra.push(sgLetra);
  letra.push(trcLetra);
  letra.push(qrtLetra);
  letra.push(qntLetra);
  letra.push(sxtLetra);
  letra.push(stmLetra);
  letra.push(otvLetra);
  letra.push(nnaLetra);
  
  
  for (let i = 0; i < letra.length; i++){
    nome[i] = letra[i][Math.floor(Math.random() * letra[i].length)];
  }
  
  return nome.join('');
}


app.get('/nomes/aleatorios', (req, res) => {
  
  console.log('Gerei um nome errado do grupo!');
  
  const nomeErrado = GeraNome();
  
  return res.json({
    "nome_errado" : nomeErrado
  });
  
});


function verificaNome(nome){
  const dadosAtuaiString = fs.readFileSync(caminhoValidos, 'utf-8');
  const nomesValidos = JSON.parse(dadosAtuaiString);
  
  if (nomesValidos.includes(nome)){
    return true;
  }
  
  return false;

}

function atualizaBanco(bool, caminho, dado){
  
  if (bool == true){
    const dadosAtuaisString = fs.readFileSync(caminho, 'utf-8');
    const array = JSON.parse(dadosAtuaisString);
    
    array.push(dado);
    
    const novosDadosString = JSON.stringify(array, null, 2);
    fs.writeFileSync(caminho, novosDadosString);
  } else {
    const dadosErradosArray = JSON.parse(fs.readFileSync(caminho, 'utf-8'));
    let erroEncontrado = dadosErradosArray.find(erro => erro.nome === dado);
    
    if (erroEncontrado){
      erroEncontrado.contagem++
    } else {
      dadosErradosArray.push({nome : dado, contagem : 1});
    }

    fs.writeFileSync(caminho, JSON.stringify(dadosErradosArray, null, 2));
  }
}


app.post('/verificar', (req, res) => {
  
  const { nome } = req.body;
  
  if (!nome) {
    return res.status(400).json({mensagem: "O campo 'nome' é obrigatório"});
  }

  const eValido = verificaNome(nome);

  if (!eValido){
    atualizaBanco(false, caminhoErros, nome);
    return res.status(400).json({ valido: false, mensagem: "Nome inválido!"});
  }
  
  return res.json({ valido: true, mensagem: "Nome válido!"});

});

app.post('/nomes/validos', (req, res) => {
  
  const { novoNome } = req.body;
  
  if(!novoNome){
    return res.status(400).json({mensagem: "O campo 'novoNome' é obrigatório"});
  }

  atualizaBanco(true, caminhoValidos, novoNome);
  
  console.log(`Novo nome válido adicionado ao banco de dados: ${novoNome}`);
  
  return res.status(201).json({
    mensagem: "Novo nome válido adicionado.",
    novoNome: novoNome
  });
  
});

app.get('/estatisticas/erros', (req, res) => {
  const dadosAtuaisString = fs.readFileSync(caminhoErros, 'utf-8');
  const erros = JSON.parse(dadosAtuaisString);
  
  erros.sort((a, b) => b.contagem - a.contagem);
  
  return res.json({
    rankingErros : erros
  });
  
});


// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});