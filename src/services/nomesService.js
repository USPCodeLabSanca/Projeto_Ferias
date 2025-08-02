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

function geradorNomesAleatorios() {
  const parte1 = ['Cod', 'Code', 'Codi', 'Coda', 'Codes', 'Cod ', 'Code ', 'Codi ', 'Coda ', 'Codes ', 'Codis', 'Codis '];
  const parte2 = ['Labe', 'Labs', 'Lap', 'Lapis', 'Lap', 'Leb', 'Lebi'];
  const indice1 = Math.floor(Math.random() * parte1.length);
  const indice2 = Math.floor(Math.random() * parte2.length);
  return parte1[indice1] + parte2[indice2];
}

function verificarNomeValido(nome) {
  const nomes = lerJSON(nomesValidosPath);
  return nomes.some(n => n.nome.toLowerCase() === nome.toLowerCase());
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

function cadastrarNomeValido(nome) {
  const nomes = lerJSON(nomesValidosPath);
  nomes.push({ nome });
  escreverJSON(nomesValidosPath, nomes);

  // Remover dos erros se estiver presente
  const erros = lerJSON(estatisticasPath);
  const verificadorIndex = erros.findIndex(n => n.nome.toLowerCase() === nome.toLowerCase());

  if (verificadorIndex !== -1) {
    erros.splice(verificadorIndex, 1);
    escreverJSON(estatisticasPath, erros);
  }
}

function getRanking() {
  const nomes = lerJSON(estatisticasPath);

  nomes.sort((a, b) => b.quantidade - a.quantidade);

  for (let i = 0; i < nomes.length; i++) {
    nomes[i]['ranking'] = i + 1;
  }

  return nomes;
}

module.exports = {
  geradorNomesAleatorios,
  verificarNomeValido,
  cadastrarNomeErrado,
  cadastrarNomeValido,
  getRanking
};
