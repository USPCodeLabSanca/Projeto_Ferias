import React from "react";
import Tecla from "./Tecla";


export default function Teclado() {
  const teclas1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const teclas2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const teclas3 = ["Z", "X", "C", "V", "B", "N", "M"];

  
  return (
    <div className="teclado">
      <div className="linha1">{teclas1.map((tecla) => {
          return <div><Tecla val={tecla}/></div>
      })}</div>
      <div className="linha2">{teclas2.map((tecla) => {
          return <div><Tecla val={tecla}/></div>
      })}</div>
      <div className="linha3">
        <Tecla val="ENTER" teclaGrande/>
        {teclas3.map((tecla) => {
          return <div><Tecla val={tecla}/></div>
      })}
        <Tecla val="DELETE" teclaGrande/>
        </div>
    </div>
  )
}

  