import Game from "./components/Game";
import Header from "./components/Header";
import Modal from "./components/Modal";
import { useEffect, useState } from "react";

function App() {
	const [currentMode, setCurrentMode] = useState("SINGLE");
	const [currentGuess, setCurrentGuess] = useState("");
	const [showModal, setShowModal] = useState(false);
	const [totalWins, setTotalWins] = useState(0);
	const [resetGame, setResetGame] = useState(false);
	const [gameStatus, setGameStatus] = useState<"PLAYING" | "WON" | "LOST">(
		"PLAYING"
	);

	const modes = [
		{ name: "SINGLE", value: 1 },
		{ name: "DOUBLE", value: 2 },
		{ name: "QUADRUPLE", value: 4 },
	];

	 let totalGames: number;

		useEffect(() => {
			console.log("currentMode: ", currentMode);
			totalGames =
				modes.find((mode) => mode.name === currentMode)?.value ?? 1;
			console.log("totalGames: ", totalGames);
		}, [currentMode]);

		useEffect(() => {
			if (gameStatus === "WON" || gameStatus === "LOST") {
				setShowModal(true);
			}
		}, [gameStatus]);

		const onReset = () => {
			setTotalWins(0);
			setCurrentGuess("");
			setShowModal(false);
			setGameStatus("PLAYING");
			setResetGame(true);
		};

		useEffect(() => {
			if (totalWins === totalGames) {
				setGameStatus("WON");
			}
		}, [totalWins]);

	return (
		<div>
			<Header
				modes={modes}
				currentMode={currentMode}
				setCurrentMode={setCurrentMode}
				onReset={onReset}
			/>
			<div className="flex-wrap">
				<Game
					maxAttempts={6}
					currentGuess={currentGuess}
					setCurrentGuess={setCurrentGuess}
					resetGame={resetGame}
					setResetGame={setResetGame}
					totalWins={totalWins}
					setTotalWins={setTotalWins}
					setGameStatus={setGameStatus}
				/>
			</div>
			{showModal && (
				<Modal
					isWinner={gameStatus === "WON"}
					onReset={onReset}
				/>
			)}
		</div>
	);
}

export default App;
