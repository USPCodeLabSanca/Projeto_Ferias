const fs = require('fs');
const path = require('path');

const nomesValidosPath = path.join(__dirname, '../database/validos.json');
const estatisticasPath = path.join(__dirname, '../database/erros.json');

function lerJSON(arquivo) {
  const conteudo = fs.readFileSync(arquivo, 'utf-8');
  return JSON.parse(conteudo);
}

function escreverJSON(arquivo, dados) {
  fs.writeFileSync(arquivo, JSON.stringify(dados, null, 2), 'utf-8');
}

function geradorNomesAleatorios(){
    const parte1 = ['Cod', 'Code', 'Codi', 'Coda', 'Codes', 'Cod ', 'Code ', 'Codi ', 'Coda ', 'Codes '];
    const parte2 = ['Labe', 'Labs', 'Lap', 'Lapis', 'Lap', 'Leb', 'Lebi'];

    const indice1 = Math.floor(Math.random() * parte1.length);
    const indice2 = Math.floor(Math.random() * parte2.length);

    const resultado = parte1[indice1] + parte2[indice2];

    return resultado;
}

function verificarNomeValido(nome) {
  const nomes = lerJSON(nomesValidosPath);

  const verificador = nomes.find(n => n.nome.toLowerCase() === nome.toLowerCase());

  if (verificador) return true;
  else return false;
}

function cadastrarNomeErrado(nome) {
  const nomes = lerJSON(estatisticasPath);

  const verificador = nomes.find(n => n.nome.toLowerCase() === nome.toLowerCase());

  if (verificador) {
    verificador.quantidade += 1;
  } else {
    nomes.push({ nome: nome, quantidade: 1 });
  }

  escreverJSON(estatisticasPath, nomes);
}

function cadastarNomeValido(nome) {
  const nomes = lerJSON(nomesValidosPath);
  nomes.push({ nome: nome });
  escreverJSON(nomesValidosPath, nomes);

  //verificar se o novo nome válido já n foi cadastrado como errado. se sim, remover
}



module.exports = {
    nomesAleatorios: (req, res) => {
      const nomeAleatorio = geradorNomesAleatorios();
      res.send(nomeAleatorio);
    },

    verificar: (req, res) => {
      const nome = req.body.nome;
      const valido = verificarNomeValido(nome);

      if (valido) res.send('Nome Válido!');
      else {
        cadastrarNomeErrado(nome);
        res.send('Nome Inválido!');
      }
    },

    nomesValidos:(req, res) => {
      const nome = req.body.nome;
      var verificador = verificarNomeValido(nome);

      if (verificador) res.send('Nome já cadastrado');
      else {
        cadastarNomeValido(nome);
        res.send('Cadastro realizado com sucesso');
      }

    }
}