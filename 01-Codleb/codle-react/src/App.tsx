import Board from "./components/Board";

function App() {
  return (
    <div>
      <div className="p-8 justify-items-center">
        <h1 className="text-3xl font-bold">Codle</h1>
      </div>
      <Board maxAttempts={6} />
    </div>
  );
}

export default App;
