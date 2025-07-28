import CharTermo from "./CharTermo";
import { useEffect, useState } from "react";

export default function WordRow(){


    const [currentGuess, setCurrentGuess] = useState('')


    useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key.toUpperCase();
      
      if (key === 'ENTER') {
        // submitGuess();
      } else if (key === 'BACKSPACE') {
        setCurrentGuess(prev => prev.slice(0, -1));
      } else if (key.match(/[A-Z]/) && key.length === 1 && currentGuess.length < 5) {
        setCurrentGuess(prev => prev + key);
      }
    };

      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentGuess]);
  
  return(
    <div className="flex gap-4">
      {[...Array(5)].map((__, index) => (
        <CharTermo key={index} value={currentGuess[index]}/>
      ))}
    </div>
  )
}