import Game from "./components/Game";

function App() {
	return (
		<div>
			<div className="p-8 justify-items-center">
				<h1 className="text-3xl font-bold text-white">CODLE</h1>
			</div>
			<div className="flex-wrap columns-2">
				<Game maxAttempts={6} />
				<Game maxAttempts={6} />
				<Game maxAttempts={6} />
				<Game maxAttempts={6} />
			</div>
		</div>
	);
}

export default App;
