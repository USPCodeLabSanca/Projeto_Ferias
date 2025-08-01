import "./index.css";
import Header from "./components/Header.jsx";
import Board from "./components/Textbox.jsx";
import Teclado from "./components/Teclado.jsx";
import React from "react";
import { AppContext } from "./components/AppContext.jsx";
import { getPalavraAleatoria, boardPadrao } from "./components/Palavras.jsx"


export default function App() {
    const [correct, setCorrect] = React.useState(getPalavraAleatoria());
    console.log(correct)
    const [board, setBoard] = React.useState(boardPadrao);
    const [tentativaAtual, setTentativaAtual] = React.useState({ tentativa: 0, posicao: 0});
    const [acertou, setAcertou] = React.useState(false);

    const onSelect = (val) => {
      if (tentativaAtual.posicao > 4 || acertou) return;
      const newBoard = [...board]
      newBoard[tentativaAtual.tentativa][tentativaAtual.posicao] = val
      setBoard(newBoard)
      setTentativaAtual({ ...tentativaAtual, posicao: tentativaAtual.posicao + 1}); 
    }

    const onDelete = () => {
      if (tentativaAtual.posicao === 0 || acertou) return;
      const newBoard = [...board]
      newBoard[tentativaAtual.tentativa][tentativaAtual.posicao - 1] = ""
      setBoard(newBoard)
      setTentativaAtual({ ...tentativaAtual, posicao: tentativaAtual.posicao -1 })
    }

    const onEnter = () => {
      if (tentativaAtual.posicao !== 5 || acertou) return;
      const tentativaPalavra = board[tentativaAtual.tentativa].join("").toLowerCase()
      if (tentativaPalavra === correct.toLowerCase()) {
        setAcertou(true);
        alert("Acertou!")
        return;
      }
      setTentativaAtual({tentativa : tentativaAtual.tentativa + 1, posicao: 0})
    }
    return (
      <div className="App">
        <Header />
        <AppContext.Provider value=
        {{board,
         setBoard,
         tentativaAtual,
         setTentativaAtual,
         onEnter,
         onDelete,
         onSelect,
         correct,
         acertou}}>
          <div className="game">
            <Board />
            <Teclado />
          </div>
        </AppContext.Provider>
      </div>
    )
}
