import './Layout.css';
import React, { useState, useEffect } from "react";
import { Sorteio } from './Sorteio';

export default function Layout() {
  const matrizrei = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ];

  const [ldigitadas, setldigitadas] = useState(matrizrei);
  const [linhaAtual, setLinhaAtual] = useState(0);
  const [colunaAtual, setColunaAtual] = useState(0);
  //const [palavraSorteada] = useRef(Sorteio());

  useEffect(() => {
    function pressionar(evento) {
      const tecla = evento.key;
      const letra = /^[a-zA-Z]$/.test(tecla);

      if (letra && colunaAtual < 5) {
        const matriznova = [...ldigitadas];
        matriznova[linhaAtual][colunaAtual] = tecla.toUpperCase();
        setldigitadas(matriznova);
        setColunaAtual(colunaAtual + 1);
      }

      if (tecla === "Backspace" && colunaAtual > 0) {
        const matriznova = [...ldigitadas];
        matriznova[linhaAtual][colunaAtual - 1] = "";
        setldigitadas(matriznova);
        setColunaAtual(colunaAtual - 1);
      }

      if (tecla === "Enter" && colunaAtual === 5) {
        if (linhaAtual < 5) {
          setLinhaAtual(linhaAtual + 1);
          setColunaAtual(0);
        }
      }
    }

    window.addEventListener("keydown", pressionar);
    return () => {
      window.removeEventListener("keydown", pressionar);
    };
  }, [ldigitadas, linhaAtual, colunaAtual]);

  return (
    <div className="maioral">
      {ldigitadas.map((linha, i) => (
        <div className="linha" key={i}>
          {linha.map((letra, j) => (
            <div className="celula" key={j}>
              {letra}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
