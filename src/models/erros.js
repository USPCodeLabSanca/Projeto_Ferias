import { lerDB, escreverDB } from "../database/dbMain.js";

export async function adicionarErro(nomeErrado) {
  const dbErros = await lerDB("erros.json");
  dbErros.push({ nome: nomeErrado, vezes: 1 }); 
  escreverDB("erros.json", dbErros);
}

// Retorna todos os objetos.
export async function pegarTodosErros() {
  const dbErros = await lerDB("erros.json");
  return dbErros || null;
}

// Retorna objeto dado nome errado
export async function pegarErro(nomeErrado) {
  const dbErros = await lerDB("erros.json");
  return dbErros.find(({ nome }) => nome === nomeErrado) || null;
}



// Retorna true se o nome estiver na database
export async function buscarErro(nomeErrado) {
  const dbErros = await lerDB("erros.json");
  return dbErros.some(({ nome }) => nome === nomeErrado);
}

export async function atualizarErro(nomeErrado, dadosAtualizados) {
  const dbErros = await lerDB("erros.json");
  const index = dbErros.findIndex(({ nome }) => nome === nomeErrado);
  if (index === -1) {
    return false; // não achou o objeto para atualizar
  }
  dbErros[index] = dadosAtualizados;
  escreverDB("erros.json", dbErros);

  return true;
}

export async function deletarNomeErrado(nomeErrado){

}

