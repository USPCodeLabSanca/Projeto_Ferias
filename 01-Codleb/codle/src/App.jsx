// App.jsx
import { useState, useEffect } from 'react'
import './App.css'

function App() {
  // a palavra a ser adivinhada (ainda testando com uma palavra só, posteriomente associo o json de palavras)
  const [solucao, setSolucao] = useState("REACT");

  // vetor de tentativas do jogador 
  const [tentativas, setTentativas] = useState(Array(6).fill(null));

  // jogada atual 
  const [atualTentativa, setAtualTentativa] = useState("");

  // turno atual do jogo
  const [turno, setTurno] = useState(0)


  useEffect(() => {
    // função que será chamada quando uma tecla for pressionada
    const pressionaTecla = (event) => {

      if (event.key === 'Enter') {
        // lógica de submeter a tentativa (Passo 5)
        console.log('submeteu a tentativa');

      } else if (event.key === 'Backspace') {
        // lógica de apagar a última letra
        setAtualTentativa(prev => prev.slice(0, -1));

      } else if (atualTentativa.length < 5 && /^[a-zA-Z]$/.test(event.key)) {
        // lógica de adicionar uma letra, se não for muito longa e for uma letra válida
        setAtualTentativa(prev => prev + event.key.toUpperCase());
      }
    };

    window.addEventListener('keydown', pressionaTecla);

    // limpeza do evento para evitar bugs
    return () => {
      window.removeEventListener('keydown', pressionaTecla);
    };
  }, [atualTentativa]); // a dependência faz o efeito rodar de novo se currentGuess mudar


  const formataTentativa = () => {
    const vetorSolucao = [...solucao];
    const tentativaFormatada = [...atualTentativa].map((l, i) => {
      return { key: l, color: 'grey' }; // começa tudo cinza
    });
  
    // acha as letras verdes (posição correta)
    tentativaFormatada.forEach((l, i) => {
      if (vetorSolucao[i] === l.key) {
        tentativaFormatada[i].color = 'green';
        vetorSolucao[i] = null; // para não checar de novo
      }
    });
  
    // acha as letras amarelas (posição errada)
    tentativaFormatada.forEach((l, i) => {
      if (vetorSolucao.includes(l.key) && l.color !== 'green') {
        tentativaFormatada[i].color = 'yellow';
        vetorSolucao[vetorSolucao.indexOf(l.key)] = null;
      }
    });
  
    return tentativaFormatada;
  };


  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center p-4">
      <h1>CODLE</h1>
    </div>
  )
}

export default App;
