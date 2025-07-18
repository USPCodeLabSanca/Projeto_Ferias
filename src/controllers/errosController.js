import erros from "../models/erros.js";

class ErrosController {
  
  static async gerarListaErros (req, res, next) {
    try{
      const dbErros = await erros.pegarTodosErros();
      // Armazena informações para o middleware
      req.result = dbErros;
      next();
    } catch(erro) {
      return next(new ErroBase("Erro ao acessar arquivo"));
    }
  }

}

export default ErrosController;