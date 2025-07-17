import nomes from "../models/nomes.js";
import erros from "../models/erros.js";

class NomesController {

  static async gerarNomeErrado (req, res) {
    return res.status(200).send("CodeLabS");
  }

  static async verificarNome (req, res) {
    try{
      if (!req.body) {
        return res.status(400)
                  .send("Corpo da requisição ausente ou malformado.");
      }
      
      const nomeFornecido = req.body.nome;
      
      if(!nomeFornecido) return res.status(400).send("Nome não fornecido.");
    
    
      // Verifica se o nome fornecido está na lista de nomes validos.
      const ehValido = await nomes.buscarNome(nomeFornecido);
    
      // Se for válido, não faz nada
      if (ehValido) return res.status(200).send("Nome passado é valido.");
      
      // Verifica se o nome já foi registrado.
      const erroExistente = await erros.pegarErro(nomeFornecido);
    
      if (erroExistente) {
        erroExistente.vezes++;
        await erros.atualizarErro(erroExistente.nome, erroExistente);
        return res.status(404).send("Nome não é válido, já registrado.");
      } else {
        // Registra novo nome inválido.
        await erros.adicionarErro(nomeFornecido);
        return res.status(201).send("Nome não é válido e foi registrado.");
      }
    } catch(erro) {
      return res
                .status(500)
                .json({ messagem: `${erro.message} - Erro ao acessar arquivo.`});
    }
  }
  

  static async adicionarNomeValido (req, res){
    try {
      if (!req.body) {
        return res.status(400)
                  .send("Corpo da requisição ausente ou malformado.");
      }

      const nomeFornecido = req.body.nome;
      if(!nomeFornecido) return res.status(400).send("Nome não fornecido.");
      
      const jaExiste = await nomes.buscarNome(nomeFornecido);
      if(jaExiste) {
        return res.status(409).send("Versão correta já existe.");
      } else {
        await nomes.adicionarNome(nomeFornecido);
        return res.status(201).send("Nova versão correta adicionada.");
      }
    } catch(erro) {
      return res
                .status(500)
                .json({ messagem: `${erro.message} - Erro ao acessar arquivo.`});
    }
  }
}

export default NomesController;