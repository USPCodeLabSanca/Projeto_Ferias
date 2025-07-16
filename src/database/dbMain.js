import fs from 'fs';
import path from 'path';

export async function lerDB(nomeDB){
  const caminhoDB = path.join('./src/database', `${nomeDB}`);
  try {
    const dados = await fs.promises.readFile(caminhoDB, 'utf-8');
    console.log("Conseguiu ler dados, retornando objeto JS.")
    // Converte a string JSON para objeto JS
    return Object.values(JSON.parse(dados));
  } catch (erro) {
    // Caso arquivo não encontrado, cria-se ele.
    if (erro.code === 'ENOENT') {
      console.warn(`Arquivo "${nomeDB}" não encontrado. Criando um novo arquivo...`);
      // Cria o arquivo com um array vazio
      await fs.promises.writeFile(caminhoDB, '[]', 'utf-8'); 
      return [];
    } else {
      console.error("Falhou em ler os dados:", erro);
      return null;
    }
  }
}

export async function escreverDB(nomeDB, dados){
  if(!dados) return console.log('Nenhum dado encontrado.');
  const caminhoDB = path.join('./src/database', `${nomeDB}`);
  try {
    // Converte os dados para uma string JSON
    await fs.promises.writeFile(caminhoDB, JSON.stringify(dados), 'utf-8');
    console.log("Dados salvos");
  } catch (erro) {
    console.error("Falha ao escrever os dados:", erro);
  }
}

