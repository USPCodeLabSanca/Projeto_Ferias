import erros from "../models/erros.js";

class ErrosController {
  
  static async gerarListaErros (req, res) {
    const dbErros = await erros.pegarTodosErros();
    res.status(200).json(dbErros);
  }
  
}

export default ErrosController;