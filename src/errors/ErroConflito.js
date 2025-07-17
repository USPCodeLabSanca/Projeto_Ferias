import ErroBase from "./ErroBase.js";

class ErroConflito extends ErroBase {
  constructor(mensagem = "Conflito com recurso existente") {
    super(mensagem, 409);
  }
}

export default ErroConflito;