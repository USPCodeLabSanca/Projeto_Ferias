import { lerDB, escreverDB } from "../database/dbMain.js";

class Erros {
  constructor(arquivo = "erros.json") {
    this.arquivo = arquivo;
  }

  async adicionarErro(nomeErrado) {
    const dbErros = await lerDB(this.arquivo);
    dbErros.push({ nome: nomeErrado, vezes: 1 });
    await escreverDB(this.arquivo, dbErros);
  }

  async pegarTodosErros() {
    const dbErros = await lerDB(this.arquivo);
    return dbErros || null;
  }

  async pegarErro(nomeErrado) {
    const dbErros = await lerDB(this.arquivo);
    return dbErros.find(({ nome }) => nome === nomeErrado) || null;
  }

  async buscarErro(nomeErrado) {
    const dbErros = await lerDB(this.arquivo);
    return dbErros.some(({ nome }) => nome === nomeErrado);
  }

  async atualizarErro(nomeErrado, dadosAtualizados) {
    const dbErros = await lerDB(this.arquivo);
    const index = dbErros.findIndex(({ nome }) => nome === nomeErrado);
    if (index === -1) {
      return false;
    }
    dbErros[index] = dadosAtualizados;
    await escreverDB(this.arquivo, dbErros);
    return true;
  }

  async deletarErro(nomeErrado) {
    const dbErros = await lerDB(this.arquivo);
    const novosErros = dbErros.filter(({ nome }) => nome !== nomeErrado);
    if (novosErros.length === dbErros.length) {
      return false; // nada foi removido
    }
    await escreverDB(this.arquivo, novosErros);
    return true;
  }
}

const erros = new Erros();

export default erros;
