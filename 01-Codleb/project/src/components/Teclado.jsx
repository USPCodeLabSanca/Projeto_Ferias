import React, { useCallback, useEffect, useContext } from "react";
import Tecla from "./Tecla";
import { AppContext } from "./AppContext";


export default function Teclado() {

  const { onEnter, onDelete, onSelect } = useContext(AppContext)
  const teclas1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const teclas2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const teclas3 = ["Z", "X", "C", "V", "B", "N", "M"];
  
  const handleTeclado = useCallback((event) => {
      if (event.key === "Enter") {
        onEnter()
      }
      else if (event.key === "Backspace") {
        onDelete()
      }
      else {
        teclas1.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key)
          }
        })
        teclas2.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key)
          }
        })
        teclas3.forEach((key) => {
          if (event.key.toLowerCase() === key.toLowerCase()) {
            onSelect(key)
          }
        })
      }
  })

  useEffect(() => {
      document.addEventListener("keydown", handleTeclado)

      return () => {
        document.removeEventListener("keydown", handleTeclado)
      };
  }, [handleTeclado])

  
  return (
    <div className="teclado" onKeyDown={handleTeclado}>
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

  