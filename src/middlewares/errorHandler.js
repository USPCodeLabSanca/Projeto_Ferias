import ErroBase from "../errors/ErroBase.js";
import ErroConflito from "../errors/ErroConflito.js";
import ErroMaRequisicao from "../errors/ErroMaRequisicao.js";
import ErroNaoEncontrado from "../errors/ErroNaoEncontrado.js";

function errorHandler(error, req, res, next) {
  console.error(error);

  if (error instanceof ErroMaRequisicao) {
    error.enviarResposta(res);
  } else if (error instanceof ErroNaoEncontrado) {
    error.enviarResposta(res);
  } else if (error instanceof ErroConflito) {
    error.enviarResposta(res);
  } else if (error instanceof ErroBase) {
    error.enviarResposta(res);
  } else {
    const erroDesconhecido = new BasicError("Erro interno do servidor", 500);
    erroDesconhecido.enviarResposta(res);
  }
}

export default errorHandler;
