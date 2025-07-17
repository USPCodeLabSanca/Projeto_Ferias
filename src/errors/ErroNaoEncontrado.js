import ErroBase from "./ErroBase.js";

class ErroNaoEncontrado extends ErroBase {
  constructor(mensagem = "Recurso não encontrado") {
    super(mensagem, 404);
  }
}

export default ErroNaoEncontrado;