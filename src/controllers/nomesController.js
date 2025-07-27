const fs = require('fs');
const path = require('path');

const nomesValidos = path.join(__dirname, '../database/nomesValidos.json');
const estatisticas = path.join(__dirname, '../database/estatisticas.json');

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
  const nomes = lerJSON(nomesValidos);

  const verificador = nomes.find(n => n.nome.toLowerCase() === nome.toLowerCase());

  if (verificador) {
    return true;
  } else {
    cadastrarNomeErrado(nome);
    return false;
  }
}

function cadastrarNomeErrado(nome) {
  const nomes = lerJSON(estatisticas);

  const verificador = nomes.find(n => n.nome.toLowerCase() === nome.toLowerCase());

  if (verificador) {
    verificador.quantidade += 1;
  } else {
    nomes.push({ nome: nome, quantidade: 1 });
  }

  escreverJSON(estatisticas, nomes);
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
        else res.send('Nome Inválido!');
    }
}