import { lerDB, escreverDB } from '../database/dbMain.js';

class Nomes {
  constructor(arquivo = 'validos.json') {
    this.arquivo = arquivo;
  }

  async adicionarNome (nome) {
    const dbValidos = await lerDB(this.arquivo);
    dbValidos.push({ nome });
    await escreverDB(this.arquivo, dbValidos);
  }

  async pegarNome(nomeBuscado) {
    const dbValidos = await lerDB(this.arquivo);
    return dbValidos.find(({ nome }) => nome === nomeBuscado) || null;
  }

  async buscarNome(nomeBuscado) {
    const dbValidos = await lerDB(this.arquivo);
    return dbValidos.some(({ nome }) => nome === nomeBuscado);
  }

  async buscarTodosNomes() {
    const dbValidos = await lerDB(this.arquivo);
    return dbValidos;
  }

  async atualizarNome(nomeBuscado, dadosAtualizados) {
    const dbValidos = await lerDB(this.arquivo);
    const index = dbValidos.findIndex(({ nome }) => nome === nomeBuscado);
    if (index === -1) {
      return false;
    }
    dbValidos[index] = dadosAtualizados;
    await escreverDB(this.arquivo, dbValidos);
    return true;
  }

  async deletarNome(nomeBuscado) {
    const dbValidos = await lerDB(this.arquivo);
    const novosValidos = dbValidos.filter(({ nome }) => nome !== nomeBuscado);
    if (novosValidos.length === dbValidos.length) {
      return false; // nada foi deletado
    }
    await escreverDB(this.arquivo, novosValidos);
    return true;
  }
}

const nomes = new Nomes();

export default nomes;
