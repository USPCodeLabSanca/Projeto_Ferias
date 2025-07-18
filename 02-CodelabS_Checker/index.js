// Importa o framework Express
const express = require('express');
const fs = require('fs');

// Cria uma instância do aplicativo Express
const app = express();
app.use(express.json());
const PORT = 3000; // Define a porta em que o servidor vai rodar
let listaValidos = [];
let listaErros = [];
// Inicia o servidor e o faz "ouvir" na porta definida
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

//Funcionalidade da API


//Incluir registros de nomes válidos
app.post("/nomes/validos", (req, res) => {
  let validos = fs.readFileSync("validos.json", "utf-8");//Lê o arquivo com os nomes já preenchidos
  if(validos){
    listaValidos = JSON.parse(validos);
  }
  const nomeValido = req.body.nomeValido;//Pega o valor da entrada
  if(listaValidos.find(item=> item.nomeValido === nomeValido)){//Verifica se o nome já foi cadastrado
    return res.send("Nome já cadastrado");
  }
  const item = {
    "nomeValido": nomeValido
  }
  listaValidos.push(item);
  fs.writeFileSync("validos.json", JSON.stringify(listaValidos), "utf-8");//Atualiza o json com a lista completa
  return res.send(nomeValido);//Apresenta para o usuário o valor colocado
});

//Verificar se o nome está correto
app.post("/verificar", (req, res) => {
  const verificar = req.body.verificar;//Pega o nome inserido pelo usuário
  let validos = fs.readFileSync("validos.json", "utf-8");//Lê o arquivi JSON com os nomes válidos
  if(validos){
    listaValidos = JSON.parse(validos);
  }
  if(listaValidos.find(item => item.nomeValido === verificar)){//Se o nome estiver na lista é válido, retorna true
    return res.send(true);
  }
  //Caso contrário:
  let erros = fs.readFileSync("erros.json", "utf-8")//Lê o arquivo contendo os erros
  if(erros){
    listaErros = JSON.parse(erros);
  }
  let elemento = listaErros.find(item => item.nomeErrado === verificar)//Se encontrar o erro nos registros, aumenta o número do campo contagem
  if(elemento){
    elemento.contagem += 1;
  }
  else{
    item = {
      "nomeErrado": verificar,
      "contagem": 1
    }
    listaErros.push(item);
  }
  fs.writeFileSync("erros.json", JSON.stringify(listaErros), "utf-8");//Atualiza o arquivo json e retorna false
  return res.send(false);
});

//mostrar erros do nome em ordem decrescente
app.get("/estatisticas/erros", (req, res) => {
  const erros = fs.readFileSync("erros.json", "utf-8");//Lê o arquivo de erros
  if(erros){
    listaErros = JSON.parse(erros);
  }
  //Printa os erros em ordem decrescente de acordo com o campo contagem
  return res.json(listaErros.sort(function(a, b){return b.contagem - a.contagem}));
});

//Gerador aleatório de nome errado
app.get("/nomes/aleatorio", (req, res) => {
  //0-Code Lab
  //1-CodeLabe
  //4-Coudelabs
  //2-Cosdeslasb
  //3-Cod lab
  let str = "Codelab";//String inicial a ser alterada
  let cont = 1;
  let indice;
  while(cont > 0 && cont < 7){//Repete o processo caso cont vire 0, para evitar loop infinito o processo ocorrerá no máximo 6 vezes
    let num = Math.floor(Math.random() * 5);//Escolhe um valor aleatório entre 0 e 4
    switch(num){//De acordo com o valor executa um dos seguintes casos
      case 0:
        indice = str.indexOf("l");//Encontra o índice da letra "l", indexOf usado em strings e findIndex em arrays
        str = str.slice(0, indice) + " " + str.slice(indice);//Altera a string para colocar o espaço antes do "l"
        break;
      case 1:
        if(Math.floor(Math.random()*2)){//Randomicamente coloca ao final da string "s" se o número randômico for 1 ou "e" se for 0
          str += "s";
        }else{
          str += "e";
        }
        break;
      case 2:
        indice = Math.floor(Math.random() * str.length);//Escolhe um número para representar um índice da string
        str = str.slice(0, indice) + "s" + str.slice(indice);//Adiciona um s em um lugar escolhido aleatoriamente
        break;
      case 3:
        str = str.replace("e", " ");//Troca o primeiro e encontrado por um espaço, replaceAll troca todas as ocorrências
        break;
      case 4:
        indice = str.indexOf("o");//Procura o índice da letra "o"
        str = str.slice(0, indice+1) + "u" + str.slice(indice+1);//Posiciona "u" logo após o "o"
        break;
    }
    if(Math.floor(Math.random()*2)){//Pode aumentar o número da variável cont se for 1 ou definir com 0
      cont++;
    }else{
      cont = 0;
    }
  }
  return res.send(str);//Mostra ao usuário o resultado das alterações
});