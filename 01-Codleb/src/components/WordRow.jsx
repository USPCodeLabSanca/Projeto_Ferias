import CharTermo from "./CharTermo";

export default function WordRow(props) {
  const { currentGuess, previousGuesses, targetWord, currentRow, id } = props;

  const handleValue = (index) => {
    if (currentRow === id) {
      return currentGuess[index] || "";
    } else if (id < previousGuesses.length) {
      return previousGuesses[id][index] || "";
    }
    return "";
  };

  const handleClassName = (index) => {
    if (currentRow === id) {
      return "w-13 h-13 flex items-center justify-center text-3xl font-bold rounded-xs border-[3.5px] border-[#5EC8AE] bg-[#282828]";
    } else if (id < previousGuesses.length) {
      const guess = previousGuesses[id];
      const char = guess[index];
      const targetChar = targetWord[index];

      if (char === targetChar) {
        return "w-13 h-13 flex items-center justify-center text-3xl font-bold rounded-xs bg-[#357465]";
      } else if (targetWord.includes(char)) {
        return "w-13 h-13 flex items-center justify-center text-3xl font-bold rounded-xs bg-[#8B8F4D]";
      } else {
        return "w-13 h-13 flex items-center justify-center text-3xl font-bold rounded-xs bg-[#404040]";
      }
    }
    return "w-13 h-13 flex items-center justify-center text-3xl font-bold rounded-xs bg-[#1D3D35]";
  };

  return (
    <div className="flex gap-4">
      {[...Array(5)].map((__, index) => (
        <CharTermo
          key={index}
          value={handleValue(index)}
          classNameProp={handleClassName(index)}
        />
      ))}
    </div>
  );
}
