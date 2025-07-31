import React, { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Letra(props) {
    const { board, correct, tentativaAtual } = useContext(AppContext)
    const letra = board[props.tentativa][props.pos];

    const correta = correct[props.pos] === letra
    const quase = !correta && letra !== "" && correct.includes(letra)

    const letraState = tentativaAtual.tentativa > props.tentativa && (correta ? "correta" : quase ? "quase" : "erro")
    return <div className="letra" id={letraState}>{letra}</div>;
}