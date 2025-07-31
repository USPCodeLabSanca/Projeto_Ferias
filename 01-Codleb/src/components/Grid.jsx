import WordRow from "./WordRow";
import Keyboard from "./Keyboard";

export default function Grid(props) {
  const { currentGuess, currentRow, previousGuesses, targetWord, usedLetters } =
    props;

  return (
    <div className="flex flex-col items-center gap-8">
      <div className="flex flex-col gap-3">
        {[...Array(6)].map((_, index) => (
          <WordRow
            key={index}
            id={index}
            currentGuess={currentGuess}
            previousGuesses={previousGuesses}
            targetWord={targetWord}
            currentRow={currentRow}
          />
        ))}
      </div>
      <Keyboard usedLetters={usedLetters} />
    </div>
  );
}
