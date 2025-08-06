import { useState, useEffect } from "react";
import logo from "../assets/images/logo.png";
import Grid from "./components/Grid";
import TutorialModal from "./components/TutorialModal";
import TutorialModalContent from "./components/TutorialModalContent";
import Icon from "@mdi/react";
import { mdiReload } from "@mdi/js";
import wordsData from "../assets/data/words.json";
import FinishedGame from "./components/FinishedGame";

function App() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentGuess, setCurrentGuess] = useState("");
  const [currentRow, setCurrentRow] = useState(0);
  const [previousGuesses, setPreviousGuesses] = useState([]);
  const [gameFinished, setGameFinished] = useState(false);
  const [targetWord, setTargetWord] = useState("");
  const [usedLetters, setUsedLetters] = useState([]);
  const [gameWon, setGameWon] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const resetGame = () => {
    setCurrentGuess("");
    setCurrentRow(0);
    setPreviousGuesses([]);
    setGameFinished(false);
    setUsedLetters([]);

    const words = wordsData.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord.toUpperCase());
  };

  const handleClassName = () => {
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
  };

  const checkGuess = () => {
    if (currentGuess.length !== 5) return;

    if (currentGuess === targetWord) {
      setGameWon(true);
      setGameFinished(true);
      setPreviousGuesses((prev) => [...prev, currentGuess]);
      setCurrentRow((prev) => prev + 6);
      //prev+6 so the next rows styles remain unchanged
      setCurrentGuess("");
    } else if (
      wordsData.words.some((word) => word.toUpperCase() === currentGuess)
    ) {
      const letterStatuses = handleClassName();
      setUsedLetters((prev) => [...prev, ...letterStatuses]);
      setPreviousGuesses((prev) => [...prev, currentGuess]);
      setCurrentRow((prev) => prev + 1);
      setCurrentGuess("");
    }

    if (previousGuesses.length === 5 && currentGuess !== targetWord) {
      setGameWon(false);
      setGameFinished(true);
    }
  };

  useEffect(() => {
    const words = wordsData.words;
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setTargetWord(randomWord.toUpperCase());
  }, []);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (gameFinished || currentRow >= 6) return;

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
  }, [currentGuess, gameFinished, currentRow, targetWord]);

  //missing hook dependencies, but it is working??

  return (
    <>
      <header className="p-3 flex justify-between items-center">
        <button
          type="button"
          onClick={handleOpenModal}
          onMouseDown={(e) => e.preventDefault()}
          //mousedown so the button does not get focused when clicked, because, if it does, pressing enter resets the gameFinished
          className="w-[30px] h-[30px] flex items-center justify-center border border-white rounded-sm p-0.5 px-2.5 text-white hover:text-gray-50 text-2xl font-bold transition-colors duration-200 hover:scale-110"
        >
          ?
        </button>

        <div className="flex items-center">
          <img className="w-[80px] h-[80px]" src={logo} alt="" />
          <h1 className="text-white font-bold text-4xl ml-1">CODLE</h1>
        </div>

        <button
          type="button"
          onClick={resetGame}
          onMouseDown={(e) => e.preventDefault()}
          className="w-[30px] h-[30px] flex items-center justify-center border border-white rounded-sm hover:scale-110"
        >
          <Icon path={mdiReload} size={1} color="white" />
        </button>
        <div className="absolute top-1 right-3 text-xs text-gray-400">
          Made with ❤️ by{" "}
          <a className="text-green-200" href="https://github.com/humbertoh2a">
            humbertoh2a
          </a>
        </div>
      </header>
      <main>
        <div className="flex flex-col justify-center items-center text-white">
          <Grid
            currentGuess={currentGuess}
            currentRow={currentRow}
            previousGuesses={previousGuesses}
            targetWord={targetWord}
            usedLetters={usedLetters}
          />
          {gameFinished && (
            <FinishedGame targetWord={targetWord} gameWon={gameWon} />
          )}
        </div>
        <TutorialModal isOpen={isModalOpen} onClose={handleCloseModal}>
          <TutorialModalContent />
        </TutorialModal>
      </main>
    </>
  );
}

export default App;
