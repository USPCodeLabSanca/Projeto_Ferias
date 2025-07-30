import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Letra(props) {
    const { board } = useContext(AppContext)
    const letra = board[props.pos][props.tentativa]
    return <div className="letra">Letra</div>
}