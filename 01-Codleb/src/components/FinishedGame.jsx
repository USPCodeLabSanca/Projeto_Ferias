export default function FinishedGame(props) {
  return (
    <div className="mt-3">
      <p>
        {props.gameWon
          ? "Congrats! You won!!"
          : `You lost! The word was ${props.targetWord}`}
      </p>
    </div>
  );
}
