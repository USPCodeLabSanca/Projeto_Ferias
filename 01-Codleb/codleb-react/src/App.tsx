import { useEffect, useState } from "react";
import { Keyboard } from "./components/keyboard.component";
import { Board } from "./components/board.component";
import "./index.css";
import wordsData from "./assets/data/words.json";
import { NUM_ATTEMPTS, WORD_LENGTH } from "./utils/constants";

type Cell = {
  letter: string;
  status: "correct" | "present" | "absent" | "";
};

const getInitialGrid = (): Cell[][] =>
  Array.from({ length: NUM_ATTEMPTS }, () =>
    Array.from({ length: WORD_LENGTH }, () => ({ letter: "", status: "" }))
  );

export const App = () => {
  const [answer, setAnswer] = useState("");
  const [grid, setGrid] = useState<Cell[][]>(getInitialGrid);
  const [currentRow, setCurrentRow] = useState(0);
  const [currentCol, setCurrentCol] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [usedKeys, setUsedKeys] = useState<
    Record<string, "correct" | "present" | "absent">
  >({});

  useEffect(() => {
    const randomWord =
      wordsData.words[Math.floor(Math.random() * wordsData.words.length)];
    setAnswer(randomWord.toUpperCase());
  }, []);

  const evaluateRow = (row: Cell[]): Cell[] => {
    return row.map((cell, i) => {
      if (cell.letter === answer[i]) return { ...cell, status: "correct" };
      if (answer.includes(cell.letter)) return { ...cell, status: "present" };
      return { ...cell, status: "absent" };
    });
  };

  const updateUsedKeys = (row: Cell[]) => {
    const updated = { ...usedKeys };
    row.forEach((cell) => {
      const current = updated[cell.letter];
      if (cell.status === "correct") {
        updated[cell.letter] = "correct";
      } else if (cell.status === "present" && current !== "correct") {
        updated[cell.letter] = "present";
      } else if (
        cell.status === "absent" &&
        current !== "correct" &&
        current !== "present"
      ) {
        updated[cell.letter] = "absent";
      }
    });
    setUsedKeys(updated);
  };

  const handleKey = (pressedKey: string) => {
    if (isGameOver || currentRow >= NUM_ATTEMPTS) return;

    if (pressedKey === "ENTER") {
      if (currentCol !== WORD_LENGTH) return;

      const guess = grid[currentRow].map((cell) => cell.letter).join("");
      if (!wordsData.words.includes(guess.toLowerCase())) {
        alert("Palavra inválida");
        return;
      }

      const evaluatedRow = evaluateRow(grid[currentRow]);
      updateUsedKeys(evaluatedRow);

      const updatedGrid = [...grid];
      updatedGrid[currentRow] = evaluatedRow;
      setGrid(updatedGrid);

      if (guess === answer) {
        alert("Você acertou");
        setIsGameOver(true);
        return;
      }

      if (currentRow === NUM_ATTEMPTS - 1) {
        alert(`A palavra era ${answer}`);
        setIsGameOver(true);
        return;
      }

      setCurrentRow((r) => r + 1);
      setCurrentCol(0);
      return;
    }

    if (pressedKey === "<") {
      if (currentCol === 0) return;

      const updatedGrid = [...grid];
      updatedGrid[currentRow][currentCol - 1] = { letter: "", status: "" };
      setGrid(updatedGrid);
      setCurrentCol((c) => c - 1);
      return;
    }

    if (
      pressedKey.length === 1 &&
      /[A-Z]/.test(pressedKey) &&
      currentCol < WORD_LENGTH
    ) {
      const updatedGrid = [...grid];
      updatedGrid[currentRow][currentCol] = {
        letter: pressedKey,
        status: "",
      };
      setGrid(updatedGrid);
      setCurrentCol((c) => c + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
      <h1 className="text-3xl text-white font-bold mt-8">CODLE</h1>
      <Board board={grid} />
      <Keyboard
        onKeyClick={(key) => handleKey(key.toUpperCase())}
        usedKeys={usedKeys}
      />
    </div>
  );
};
