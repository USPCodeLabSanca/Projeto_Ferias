import React, { useContext } from "react";
import { AppContext } from "./AppContext";

export default function Letra(props) {
    const { board } = useContext(AppContext)
    const letra = board[props.tentativa][props.pos];
    return <div className="letra">{letra}</div>;
}