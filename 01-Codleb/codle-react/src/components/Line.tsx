import Letter from "./Letter";

interface LineProps {
  word: string;
  length: number;
}

function Line({word, length}: LineProps) {
  const letters = word.split("");

  return (
    <div className="flex space-x-2 mb-2">
      {Array.from({length}).map((_, i) => (
        <Letter key={i} value={letters[i] || ""} />
      ))}
    </div>
  );
}

export default Line;