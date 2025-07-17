import ErroBase from "./ErroBase.js";

class ErroMaRequisicao extends ErroBase {
  constructor(mensagem = "Corpo da requisição ausente ou malformado.") {
    super(mensagem, 400);
  }
}

export default ErroMaRequisicao;