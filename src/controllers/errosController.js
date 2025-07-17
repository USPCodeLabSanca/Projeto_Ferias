import erros from "../models/erros.js";

class ErrosController {
  
  static async gerarListaErros (req, res) {
    try{
      const dbErros = await erros.pegarTodosErros();
      return res.status(200).json(dbErros);
    } catch(erro) {
      return res
                .status(500)
                .json({ messagem: `${erro.message} - Erro ao acessar arquivo.`});
    }
  }

}

export default ErrosController;