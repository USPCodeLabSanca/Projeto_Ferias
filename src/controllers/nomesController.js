import nomes from "../models/nomes.js";
import erros from "../models/erros.js";

class NomesController {

  static async gerarNomeErrado (req, res) {
    res.status(200).send("CodeLabS");
  }

  static async verificarNome (req, res) {
    if (!req.body) {
      return res.status(400)
                .send("Corpo da requisição ausente ou malformado.");
    }
    
    const nomeFornecido = req.body.nome;
    
    if(!nomeFornecido) res.status(400).send("Nome não fornecido.");
  
  
    // Verifica se o nome fornecido está na lista de nomes validos.
    const ehValido = await nomes.buscarNome(nomeFornecido);
  
    // Se for válido, não faz nada
    if (ehValido) res.status(200).send("Nome passado é valido.");
    
    // Verifica se o nome já foi registrado.
    const erroExistente = await erros.pegarErro(nomeFornecido);
  
    if (erroExistente) {
      erroExistente.vezes++;
      await erros.atualizarErro(erroExistente.nome, erroExistente);
      res.status(404).send("Nome não é válido, já registrado.");
    } else {
      // Registra novo nome inválido.
      await erros.adicionarErro(nomeFornecido);
      res.status(201).send("Nome não é válido e foi registrado.");
    }
  }

  static async adicionarNomeValido (req, res){
    if (!req.body) {
      return res.status(400)
                .send("Corpo da requisição ausente ou malformado.");
    }

    const nomeFornecido = req.body.nome;
    if(!nomeFornecido) res.status(400).send("Nome não fornecido.");
    
    const jaExiste = await nomes.buscarNome(nomeFornecido);
    if(jaExiste) {
      res.status(409).send("Versão correta já existe.");
    } else {
      await nomes.adicionarNome(nomeFornecido);
      res.status(201).send("Nova versão correta adicionada.");
    }
  }
}

export default NomesController;