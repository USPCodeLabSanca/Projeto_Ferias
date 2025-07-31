import bancoPalavras from "../assets/data/words.json"
export const boardPadrao = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""]
]

export function getPalavraAleatoria() {
  const lista = bancoPalavras.words;
  return lista[Math.floor(Math.random() * lista.length)].toUpperCase();
}