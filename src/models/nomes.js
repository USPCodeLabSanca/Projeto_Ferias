import { lerDB, escreverDB } from "../database/dbMain.js";

export async function adicionarNome(nome) {
  const dbValidos = await lerDB("validos.json");
  dbValidos.push( { nome: nome } );
  escreverDB("validos.json", dbValidos);
}

export async function pegarNome(nomeBuscado) {
  const dbValidos = await lerDB("validos.json");
  return dbValidos.find(({ nome }) => nome === nomeBuscado) || null;
}

// Retorna true se o nome estiver na database
export async function buscarNome(nomeBuscado) {
  const dbValidos = await lerDB("validos.json");
  return dbValidos.some(({ nome }) => nome === nomeBuscado);
}

export async function atualizarNome(nomeBuscado, dadosAtualizados){
  const dbValidos = await lerDB("validos.json");
  const index = dbValidos.findIndex(({ nome }) => nome === nomeBuscado);
  if (index === -1) {
    return false; // não achou o objeto para atualizar
  }
  dbValidos[index] = dadosAtualizados;
  escreverDB("validos.json", dbValidos);

  return true;
}

export async function deletarNome(nome){

}

