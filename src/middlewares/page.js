import ErroMaRequisicao from "../errors/ErroMaRequisicao.js";

async function page (req, res, next) {
  try {
    // Ex de req.query: 
    // http://localhost:3000/estatisticas/erros?pagina=1&limite=5&ordem=-1
    // -1 é Decrescente, mantém, e 1 é Crescente
    let { limite = 5, pagina = 1, ordem = -1 } = req.query;

    limite = parseInt(limite);
    pagina = parseInt(pagina);
    ordem = parseInt(ordem);

    const resultados = req.result;

    if(limite > 0 && pagina > 0){
      // Gdrantir ordem requerida.
      if(ordem){
        resultados.sort((a,b) => (a.vezes - b.vezes)*ordem);
      }
      
      // Retorna tudo na coleção de livros
      const pageResult = resultados
        .slice((pagina - 1)*limite, (pagina - 1)*limite + limite);

      res.status(200).json(pageResult);
    } else {
      next(new ErroMaRequisicao("Passado limite ou página inválida."));
    }
  } catch (error) {
    next();
  }
}

export default page;