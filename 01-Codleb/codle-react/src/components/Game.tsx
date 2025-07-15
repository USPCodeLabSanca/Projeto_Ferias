import { useState, useEffect } from "react";
import Modal from "./Modal";
import Line from "./Line";
import { AnswerProvider } from "../context/AnswerContext";
import confetti from "canvas-confetti";

interface BoardProps {
	maxAttempts: number;
}

function Game({ maxAttempts }: BoardProps) {
	const [answer, setAnswer] = useState("");
	const [currentGuess, setCurrentGuess] = useState("");
	const [guesses, setGuesses] = useState<string[]>([]);
	const [showModal, setShowModal] = useState(false);
	const [isWinner, setIsWinner] = useState(false);
	const [gameOver, setGameOver] = useState(false);

	const chooseWord = async () => {
		const jsonFile = await fetch("../src/assets/data/words.json");
		const allWords = (await jsonFile.json()).words; // The 'jsonFile' gets a dictionary, in which the pair key-value is = "words": [Array os strings]
		const randomWord =
			allWords[Math.floor(Math.random() * allWords.length)]; // By doing it, we access a random index of the array and its word
		setAnswer(randomWord.toUpperCase());
	};

	useEffect(() => {
		chooseWord();
	}, []);

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
				setCurrentGuess((currentGuess) => currentGuess.slice(0, -1)); // Remove the last letter from the word being guessed
			}

			// Submission of a word
			if (keyPressed === "Enter") {
				// If the length does not match the answer's length, just return
				if (currentGuess.length !== answer.length) {
					return;
				}
				setGuesses((prev) => [...prev, currentGuess]);
				setCurrentGuess("");

				// If it is the answer, the game ends showing a Modal and a visual effect of confetti
				if (currentGuess === answer) {
					confetti();
					setIsWinner(true);
					setShowModal(true);
					setGameOver(true);

					// If it's not the answer, we must check if it was the last try. If the person lost it, show the result Modal
				} else if (guesses.length + 1 >= maxAttempts) {
					setIsWinner(false);
					setShowModal(true);
					setGameOver(true);
				}
			}

			keyPressed = keyPressed.toUpperCase(); // Making sure the consistency, everything is upperCase

			// Regex, /^[A-Z]$/.test() it means filtering by alphabethic uppercase letters
			if (/^[A-Z]$/.test(keyPressed)) {
				if (currentGuess.length >= answer.length) {
					return;
				}
				setCurrentGuess((currentGuess) => currentGuess + keyPressed); // useState requires you to use the previous state
			}
		};

		// Every time a key is pressed, the eventListener makes the 'handleKeyBoard' function to be called
		window.addEventListener("keydown", handleKeyboard);
		return () => window.removeEventListener("keydown", handleKeyboard);
	}, [currentGuess, answer, gameOver, guesses]);

	// Arrow function to reset the game
	const resetGame = () => {
		setGuesses([]);
		setCurrentGuess("");
		setShowModal(false);
		setGameOver(false);
		setIsWinner(false);
		chooseWord();
	};

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
			{showModal && ( // If showModal is true, automatically the result of 'showModal && B' is B. Otherwise, it's false (showModal) and nothing is shown.
				<Modal
					isWinner={isWinner}
					answer={answer}
					onRestart={resetGame}
				/>
			)}
		</AnswerProvider>
	);
}

export default Game;
