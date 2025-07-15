import {useState, useEffect} from "react";
import Line from "./Line";
import { AnswerProvider } from "../context/AnswerContext";
interface BoardProps {
	maxAttempts: number;
}

function Board({ maxAttempts }: BoardProps) {
	const [answer, setAnswer] = useState("");
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState<string[]>([]);

	useEffect(() => {
		const chooseWord = async () => {
			const jsonFile = await fetch("../src/assets/data/words.json");
			const allWords = (await jsonFile.json()).words; // The 'jsonFile' gets a dictionary, in which the pair key-value is = "words": [Array os strings]
			const randomWord =
				allWords[Math.floor(Math.random() * allWords.length)]; // By doing it, we access a random index of the array and its word
			setAnswer(randomWord.toUpperCase());
		};
		chooseWord();
	}, []);

	// By doint it as an UseEffect, it receives a key from the keyboard without an <input><input\>
	useEffect(() => {
		const handleKeyboard = (e: KeyboardEvent) => {
			let keyPressed = e.key;

			// Modify the word, removindo the last letter
			if (keyPressed === "Backspace") {
				setCurrentGuess((currentGuess) => currentGuess.slice(0, -1)); // Remove the last letter from the word being guessed
			}

			// Submission of a word
			if (keyPressed === "Enter") {
				if (currentGuess.length !== answer.length) {
					return;
				}
				setGuesses((prev) => [...prev, currentGuess]);
				setCurrentGuess("");

				if (currentGuess === answer) {
					console.log("ACERTOU MISERÁVI");
				}
			}

			keyPressed = keyPressed.toUpperCase();

			// Regex, /^[A-Z]$/.test() it means filtering by alphabethic letters
			if (/^[A-Z]$/.test(keyPressed)) {
				if (currentGuess.length >= answer.length) {
					return;
				}
				setCurrentGuess((currentGuess) => currentGuess + keyPressed); // useState requires you to use the previous state to
			}
		};

		// Every time a key is pressed, the eventListener makes the 'handleKeyBoard' function to be called
		window.addEventListener("keydown", handleKeyboard);
		return () => window.removeEventListener("keydown", handleKeyboard);
	}, [currentGuess, answer]);

	return (
		<AnswerProvider answer={answer}>
			<div className="p-8 justify-items-center">
				{Array.from({ length: maxAttempts }).map((_, i) => (
					<Line
						key={i}
						word={
							guesses[i] ||
							(i === guesses.length ? currentGuess : "")
						}
						length={answer.length}
						isSubmitted={i < guesses.length}
						isBeingGuessed={i === guesses.length}
					/>
				))}
			</div>
		</AnswerProvider>
	);
}

export default Board;
