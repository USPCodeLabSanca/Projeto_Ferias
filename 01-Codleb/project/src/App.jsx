import "./index.css";
import Header from "./components/Header";
import Board from "./components/Textbox";
import Teclado from "./components/Teclado";
import boardPadrao from "./components/Palavras";
import React from 'react';

export const AppContext = React.createContext();

export default function App() {
    const [board, setBoard] = React.useState(boardPadrao)
    return (
      <div className="App">
        <Header />
        <AppContext.Provider value={{board, setBoard}}>
          <Board />
          <Teclado />
        </AppContext.Provider>
      </div>
    )
}
