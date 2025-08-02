const nomesService = require('../services/nomesService');

module.exports = {
  nomesAleatorios: (req, res) => {
    const nomeAleatorio = nomesService.geradorNomesAleatorios();
    res.send(nomeAleatorio);
  },

  verificar: (req, res) => {
    const nome = req.body.nome;
    const valido = nomesService.verificarNomeValido(nome);

    if (valido) res.send('Nome Válido!');
    else {
      nomesService.cadastrarNomeErrado(nome);
      res.send('Nome Inválido!');
    }
  },

  nomesValidos: (req, res) => {
    const nome = req.body.nome;
    const jaCadastrado = nomesService.verificarNomeValido(nome);

    if (jaCadastrado) res.send('Nome já cadastrado');
    else {
      nomesService.cadastrarNomeValido(nome);
      res.send('Cadastro realizado com sucesso');
    }
  },

  estatisticasErros: (req, res) => {
    const ranking = nomesService.getRanking();
    res.send(ranking);
  }
};
