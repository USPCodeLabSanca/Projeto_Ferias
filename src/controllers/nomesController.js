import nomes from "../models/nomes.js";
import erros from "../models/erros.js";
import ErroBase from "../errors/ErroBase.js";
import ErroMaRequisicao from "../errors/ErroMaRequisicao.js";
import ErroNaoEncontrado from "../errors/ErroNaoEncontrado.js";
import ErroConflito from "../errors/ErroConflito.js";
import requisicaoIA from "../services/service.js";

class NomesController {

  static async gerarNomeErrado (req, res, next) {
    const dbValidos = await nomes.buscarTodosNomes();
    if(!dbValidos) {
      return next(new ErroBase("Erro ao acessar arquivo"));
    }

    const prompt = `Generate a variation of "CodeLab" that:
    1. Must contain the substrings "cod" and "lab" (case-insensitive).
    2. Must not be identical to the following words, but use them as reference: 
      ${dbValidos
        .flatMap(obj => Object.values(obj))
        .join(", ")}, CodeLabS, Cod Lab.
    3. Do not concatenate other words to form the variation.
    4. Return ONLY THE WORD, with no punctuation or explanations.`;

    try{
      return res.status(200).send(await requisicaoIA(prompt));
    } catch (erro) {
      return next(new ErroBase("Erro ao consultar API."));
    }
  }

  static async verificarNome (req, res, next) {
    try{
      if (!req.body) {
        return next(new ErroMaRequisicao("Corpo da requisição ausente ou malformado."));
      }
      
      const nomeFornecido = req.body.nome;
      
      if(!nomeFornecido) {
        return next(new ErroMaRequisicao("Nome não fornecido."));
      }
    
    
      // Verifica se o nome fornecido está na lista de nomes validos.
      const ehValido = await nomes.buscarNome(nomeFornecido);
    
      // Se for válido, não faz nada
      if (ehValido) return res.status(200).send("Nome passado é valido.");
      
      // Verifica se o nome já foi registrado.
      const erroExistente = await erros.pegarErro(nomeFornecido);
    
      if (erroExistente) {
        erroExistente.vezes++;
        await erros.atualizarErro(erroExistente.nome, erroExistente);
        return next(new ErroNaoEncontrado("Nome não é válido, já registrado."));
      } else {
        // Registra novo nome inválido.
        await erros.adicionarErro(nomeFornecido);
        return res.status(201).send("Nome não é válido e foi registrado.");
      }
    } catch(erro) {
      return next(new ErroBase("Erro ao acessar arquivo"));
    }
  }
  

  static async adicionarNomeValido (req, res, next){
    try {
      if (!req.body) {
        return next(new ErroMaRequisicao("Corpo da requisição ausente ou malformado."));
      }

      const nomeFornecido = req.body.nome;
      if(!nomeFornecido) {
        return next(new ErroMaRequisicao("Nome não fornecido."));
      }

      const jaExiste = await nomes.buscarNome(nomeFornecido);
      if(jaExiste) {
        return next(new ErroConflito("Versão correta já existe."));
      } else {
        await nomes.adicionarNome(nomeFornecido);
        return res.status(201).send("Nova versão correta adicionada.");
      }
    } catch(erro) {
      return next(new ErroBase("Erro ao acessar arquivo"));
    }
  }
}

export default NomesController;