import {useEffect, useState} from "react";
import Line from "./components/Line";

function App() {
  const [answer, setAnswer] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");

  useEffect(() => {
    const choosenWord = async () => {
      const jsonFile = await fetch("../src/assets/data/words.json");
      const allWords = (await jsonFile.json()).words; // The 'jsonFile' gets a dictionary, in which the pair key-value is = "words": [Array os strings]
      const randomWord = allWords[Math.floor(Math.random() * allWords.length)]; // By doing it, we access a random index of the array and its word
      setAnswer(randomWord);
    };
    choosenWord();
  }, []);

  // By doint it as an UseEffect, it receives a key from the keyboard without an <input><input\>
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      let keyPressed = e.key;

      if (keyPressed === "Backspace") {
        setCurrentGuess((currentGuess) => currentGuess.slice(0, -1)); // Remove the last letter from the word being guessed
      }

      if (keyPressed === "Enter") {
        console.log("Word submitted");
      }

      keyPressed = keyPressed.toUpperCase();

      // Regex, it means filtering by alphabethic letters
      if (/^[A-Z]$/.test(keyPressed)) {
        setCurrentGuess((currentGuess) => currentGuess + keyPressed); // useState requires you to use the previous state to
      }
    };

    // Every time a key is pressed, the eventListener makes the 'handleKeyBoard' function to be called
    window.addEventListener("keydown", handleKeyboard);
    return () => window.removeEventListener("keydown", handleKeyboard);
  }, [currentGuess]);

  return (
    <div>
      <div>{currentGuess}</div>
      <div>{answer}</div>
      <Line word="AA" len={2} />
    </div>
  );
}

export default App;
