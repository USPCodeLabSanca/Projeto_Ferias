import { useState, useEffect } from "react";
import Line from "./Line";
import { AnswerProvider } from "../context/AnswerContext";
import confetti from "canvas-confetti";

interface BoardProps {
	maxAttempts: number;
	resetGame: boolean;
	setResetGame: (resetGame: boolean) => void;
	currentGuess: string;
	setCurrentGuess: (currentGuess: string) => void;
	totalWins: number;
	setTotalWins: (totalWins: number) => void;
	setGameStatus: (status: "PLAYING" | "WON" | "LOST") => void;
}

function Game({
	maxAttempts,
	resetGame,
	setResetGame,
	currentGuess,
	setCurrentGuess,
	totalWins,
	setTotalWins,
	setGameStatus,
}: BoardProps) {
	const [answer, setAnswer] = useState("");
	const [guesses, setGuesses] = useState<string[]>([]);
	const [gameOver, setGameOver] = useState(false);

	const chooseWord = async () => {
		const jsonFile = await fetch("../src/assets/data/words.json");
		const allWords = (await jsonFile.json()).words; // The 'jsonFile' gets a dictionary, in which the pair key-value is = "words": [Array os strings]
		const randomWord =
			allWords[Math.floor(Math.random() * allWords.length)]; // By doing it, we access a random index of the array and its word
		setAnswer(randomWord.toUpperCase());
	};

	// The first choosen word
	useEffect(() => {
		chooseWord();
	}, []);

	// Reset the game if necessary
	useEffect(() => {
		if (resetGame) {
			setGuesses([]);
			setCurrentGuess("");
			setGameOver(false);
			chooseWord();
			setResetGame(false);
		}
	}, [resetGame]);

	// Everytime the answer changes, print it in Console (For now, it's just a debug)
	useEffect(() => {
		console.log(`Answer: ${answer}`);
	}, [answer]);

	// By doint it as an UseEffect, it receives a key from the keyboard without an <input><input\>
	useEffect(() => {
		// If the game is already over, ignore it
		if (gameOver) return;

		// If not, we will listen to the keyboard
		const handleKeyboard = (e: KeyboardEvent) => {
			let keyPressed = e.key;

			// Modify the word, removindo the last letter
			if (keyPressed === "Backspace") {
				const newGuess = currentGuess.slice(0, -1);
				setCurrentGuess(newGuess); // Remove the last letter from the word being guessed
			}

			// Submission of a word
			if (keyPressed === "Enter") {
				// If the length does not match the answer's length, just return
				if (currentGuess.length !== answer.length) {
					return;
				}

				// If it is the answer, the game ends showing a visual effect of confetti
				if (currentGuess === answer) {
					confetti();
					setTotalWins(totalWins + 1);
					setGameOver(true);
					setGameStatus("WON");

					// If it's not the answer, we must check if it was the last try. If the person lost it, show the result Modal
				} else if (guesses.length + 1 >= maxAttempts) {
					setTotalWins(-1);
					setGameOver(true);
					setGameStatus("LOST");
				}

				setGuesses((prev) => [...prev, currentGuess]); // It gets all the previous and add the new one
				setCurrentGuess("");
			}
			keyPressed = keyPressed.toUpperCase(); // Making sure the consistency, everything is upperCase

			// Regex, /^[A-Z]$/.test() it means filtering by alphabethic uppercase letters
			if (/^[A-Z]$/.test(keyPressed)) {
				if (currentGuess.length >= answer.length) {
					return;
				}
				const newGuess = currentGuess + keyPressed;
				setCurrentGuess(newGuess);
			}
		};

		// Every time a key is pressed, the eventListener makes the 'handleKeyBoard' function to be called
		window.addEventListener("keydown", handleKeyboard);
		return () => window.removeEventListener("keydown", handleKeyboard);
	}, [currentGuess, answer, gameOver, guesses]);
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
						isBeingGuessed={i === guesses.length && !gameOver}
					/>
				))}
			</div>
		</AnswerProvider>
	);
}

export default Game;
