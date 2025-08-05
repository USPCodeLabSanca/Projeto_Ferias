import wordList from './assets/data/words.json'

export function Sorteio() {
  const randomIndex = Math.floor(Math.random() * wordList.words.length)
  return wordList.words[randomIndex];

    /*
    <div>
      <h2>Palavra sorteada: {randomWord}</h2>
    </div> 
    */
}

export default Sorteio;
