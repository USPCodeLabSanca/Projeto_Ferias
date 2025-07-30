import { useEffect, useState, useCallback } from "react";
import WordRow from "./WordRow";
import wordsData from "../../assets/data/words.json";
import Keyboard from "./Keyboard";

export default function Grid() {
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameWon, setGameWon] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);

  useEffect(() => {
    const words = wordsData.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord.toUpperCase());
  }, []);

  const handleClassName = useCallback(() => {
    return currentGuess.split("").map((currentChar, index) => {
      const targetChar = targetWord[index];

      if (currentChar === targetChar) {
        return { char: currentChar, status: "positioned" };
      } else if (targetWord.includes(currentChar)) {
        return { char: currentChar, status: "included" };
      } else {
        return { char: currentChar, status: "notinword" };
      }
    });
  }, [currentGuess, targetWord]);

  const checkGuess = useCallback(() => {
    if (currentGuess === targetWord) {
      alert("Venceu!");
      setGameWon(true);
    } else if (
      currentGuess.length === 5 &&
      wordsData.words.some((word) => word.toUpperCase() === currentGuess)
    ) {
      setUsedLetters((prev) => [...prev, ...handleClassName()]);
      setPreviousGuesses((prev) => [...prev, currentGuess]);
      setCurrentRow((prev) => prev + 1);
      setCurrentGuess("");
    }
  }, [currentGuess, targetWord, handleClassName]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameWon || currentRow >= 6) return;

      const key = event.key.toUpperCase();

      if (key === "ENTER") {
        if (currentGuess.length === 5) {
          checkGuess();
        }
      } else if (key === "BACKSPACE") {
        setCurrentGuess((prev) => prev.slice(0, -1));
      } else if (
        key.match(/[A-Z]/) &&
        key.length === 1 &&
        currentGuess.length < 5
      ) {
        setCurrentGuess((prev) => prev + key);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentGuess, gameWon, currentRow, checkGuess]);

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-3">
        {[...Array(6)].map((_, index) => (
          <WordRow
            key={index}
            id={index}
            currentGuess={currentGuess}
            previousGuesses={previousGuesses}
            targetWord={targetWord}
            currentRow={currentRow}
          />
        ))}
      </div>
      <Keyboard usedLetters={usedLetters} />
    </div>
  );
}
