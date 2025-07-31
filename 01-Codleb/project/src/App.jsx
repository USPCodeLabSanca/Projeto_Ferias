import "./index.css";
import Header from "./components/Header.jsx";
import Board from "./components/Textbox.jsx";
import Teclado from "./components/Teclado.jsx";
import { boardPadrao } from "./components/Palavras.jsx";
import React from "react";
import { AppContext } from "./components/AppContext.jsx";

export default function App() {
    const [board, setBoard] = React.useState(boardPadrao);
    const [tentativaAtual, setTentativaAtual] = React.useState({ tentativa: 0, posicao: 0});

    const onSelect = (val) => {
    if (tentativaAtual.posicao > 4) return;
    const newBoard = [...board]
    newBoard[tentativaAtual.tentativa][tentativaAtual.posicao] = val
    setBoard(newBoard)
    setTentativaAtual({ ...tentativaAtual, posicao: tentativaAtual.posicao + 1}); 
    }

    const onDelete = () => {
    if (tentativaAtual.posicao === 0) return;
    const newBoard = [...board]
    newBoard[tentativaAtual.tentativa][tentativaAtual.posicao - 1] = ""
    setBoard(newBoard)
    setTentativaAtual({ ...tentativaAtual, posicao: tentativaAtual.posicao -1 })
    }

    const onEnter = () => {
    if (tentativaAtual.posicao !== 5) return;
    setTentativaAtual({tentativa : tentativaAtual.tentativa + 1, posicao: 0})
    }
    return (
      <div className="App">
        <Header />
        <AppContext.Provider value={{board, setBoard ,tentativaAtual, setTentativaAtual, onEnter, onDelete, onSelect}}>
          <div className="game">
            <Board />
            <Teclado />
          </div>
        </AppContext.Provider>
      </div>
    )
}
