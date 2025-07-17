import erros from "../models/erros.js";

class ErrosController {
  
  static async gerarListaErros (req, res, next) {
    try{
      const dbErros = await erros.pegarTodosErros();
      return res.status(200).json(dbErros);
    } catch(erro) {
      return next(new ErroBase("Erro ao acessar arquivo"));
    }
  }

}

export default ErrosController;