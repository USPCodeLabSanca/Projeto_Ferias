import { useState, useEffect, useRef, useCallback } from 'react'
import palavrasDoJogo from './assets/words.json';
import './App.css'
import Tabuleiro from './componentes/Tabuleiro';
import Teclado from './componentes/Teclado';
import Modal from './componentes/Modal';

function App() {

  const [solucao, setSolucao] = useState(''); // a palavra a ser adivinhada
  const palavrasValidas = useRef(new Set(palavrasDoJogo.words)); // Set com palavras válidas do jogo
  const [tentativas, setTentativas] = useState(Array(6).fill(null)); // vetor de tentativas do jogador 
  const [atualTentativa, setAtualTentativa] = useState(""); // jogada atual
  const [turno, setTurno] = useState(0); // turno atual
  const [letrasUsadas, setLetrasUsadas] = useState({}); // objeto para armazenar as letras usadas e suas cores
  const [fimDeJogo, setFimDeJogo] = useState(false); // flag para indicar se o jogo acabou
  const [ganhou, setGanhou] = useState(false); // flag para indicar se o jogador ganhou
  const [shake, setShake] = useState(false); // estado para realizar efeito de "tremer" em tentativa inválida

  // função para pegar uma nova palavra aleatória do dicionário. usada no início e possível reinício do jogo
  const pegarNovaPalavra = useCallback(() => {
    const indiceAleatorio = Math.floor(Math.random() * palavrasDoJogo.words.length);
    const palavraAleatoria = palavrasDoJogo.words[indiceAleatorio].toUpperCase();
    setSolucao(palavraAleatoria);
    console.log("Nova palavra secreta:", palavraAleatoria);
  }, []); // lista vazia garante que essa função seja criada e memorizada apenas uma vez

  useEffect(() => {
    pegarNovaPalavra(); // pega uma nova palavra ao iniciar o jogo
  }, [pegarNovaPalavra]); // lista com a função pegarNovaPalavra indica que ela será chamada quando ela mudar de valor
  // obs.: o combo da função pegarNovaPalavra e o useEffect acaba fazendo com que o programa escolha uma palavra e, logo em seguida, outra
  // isso não era exatamente o desejado mas também não afeta nada na lógica do jogo, então não mexi mais nisso

  // função para reiniciar o jogo
  const resetaJogo = useCallback(() => {
    console.log("Reiniciando o jogo...");
    pegarNovaPalavra(); 
    setTentativas(Array(6).fill(null));
    setTurno(0);
    setAtualTentativa("");
    setLetrasUsadas({});
    setFimDeJogo(false);
    setGanhou(false);
  }, [pegarNovaPalavra]);

  // formata a tentativa atual, retornando um vetor de objetos com a letra e a cor
  const formataTentativa = useCallback(() => {
    const vetorSolucao = [...solucao];
    const tentativaFormatada = [...atualTentativa].map((l) => ({ key: l, color: 'cinza' }));
  
    // acha as letras verdes (posição correta)
    tentativaFormatada.forEach((l, i) => {
      if (vetorSolucao[i] === l.key) {
        tentativaFormatada[i].color = 'verde';
        vetorSolucao[i] = null; // para não checar de novo
        console.log(`Letra ${l.key} na posição ${i} está correta!`);
      }
    });
  
    // acha as letras amarelas (posição errada)
    tentativaFormatada.forEach((l, i) => {
      if (vetorSolucao.includes(l.key) && l.color !== 'verde') {
        tentativaFormatada[i].color = 'amarelo';
        vetorSolucao[vetorSolucao.indexOf(l.key)] = null;
      }
    });
    return tentativaFormatada;
  }, [solucao, atualTentativa]);

  // função que lida com a digitação
  const handleKeyClick = useCallback((key) => {
    if (fimDeJogo) return; // não faz nada se o jogo já acabou

    if (key === 'ENTER' || key === 'Enter') { // submeter tentativa
      const palavraInvalida = atualTentativa.length !== 5 || !palavrasValidas.current.has(atualTentativa.toLowerCase());

      if (palavraInvalida) {
        console.log('Tentativa inválida');
        setShake(true);
        setTimeout(() => setShake(false), 500);
        return;
      }
      
      const tentativaFormatada = formataTentativa();
      
      const novasLetrasUsadas = { ...letrasUsadas };
      tentativaFormatada.forEach(l => { // verificação/atualização das cores das letras usadas
        const corAtual = novasLetrasUsadas[l.key];
        if (corAtual === 'verde') return; // caso já seja verde
        if (l.color === 'verde' || (l.color === 'amarelo' && corAtual !== 'verde')) { // caso seja verde ou amarelo (e, antes do amarelo, não era verde)
          novasLetrasUsadas[l.key] = l.color;
        }
        if (!corAtual) { // caso não tenha cor definida
          novasLetrasUsadas[l.key] = l.color;
        }
      });
      setLetrasUsadas(novasLetrasUsadas);

      const novasTentativas = [...tentativas];
      novasTentativas[turno] = tentativaFormatada;
      setTentativas(novasTentativas);
      setTurno(turno + 1);
      setAtualTentativa("");

      if (atualTentativa === solucao) { // se acertou a palavra
        setGanhou(true);
        setFimDeJogo(true);
        console.log("Vitória!");
        return;
      }
      if (turno === 5) { // se for a última tentativa
        setGanhou(false);
        setFimDeJogo(true);
        console.log("Derrota...");
        return;
      }

    } else if (key === 'BACKSPACE' || key === 'Backspace') { // apagar a última letra
      setAtualTentativa(prev => prev.slice(0, -1));
    } else if (atualTentativa.length < 5 && /^[a-zA-Z]$/.test(key)) { // digitação de letra
      setAtualTentativa(prev => prev + key.toUpperCase());
    }
  }, [fimDeJogo, 
      atualTentativa, 
      turno, 
      letrasUsadas, 
      tentativas, 
      solucao, 
      formataTentativa]); 

  // useEffect para "pegar o que vem" do teclado
  useEffect(() => {
    // função interna acionada pelo teclado físico
    const pressionaTecla = (event) => {
      handleKeyClick(event.key); 
    };
  
    window.addEventListener('keydown', pressionaTecla);
  
    return () => window.removeEventListener('keydown', pressionaTecla);
  }, [handleKeyClick]); 

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center justify-center p-4">
      <h1 className="text-5xl font-bold tracking-widest">CODLE</h1>
      
      <Tabuleiro atualTentativa={atualTentativa} tentativas={tentativas} turno={turno} shake={shake} />

      <Teclado letrasUsadas={letrasUsadas} onKeyClick={handleKeyClick} />

      {fimDeJogo && (
        <Modal
          ganhou={ganhou}
          solucao={solucao}
          resetaJogo={resetaJogo}
        />
      )}

    </div>
  );
}

export default App;
