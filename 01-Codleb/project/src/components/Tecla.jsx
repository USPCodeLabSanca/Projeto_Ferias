import { AppContext } from "./AppContext";
import React, { useContext } from "react";

export default function Tecla (props) {
  const { onEnter, onDelete, onSelect } = useContext(AppContext)
  
  const selectLetter = () => {
      if (props.val === "ENTER") {
          onEnter()
      }
      else if (props.val === "DELETE"){
          onDelete()
      }
      else {
       onSelect(props.val)
      }
      
  }

  return (
    <div className="tecla" id={props.teclaGrande && "big"} onClick={selectLetter}>
      {props.val}
    </div>

  )
}