export default function Keyboard(props) {
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L", "<"],
    ["Z", "X", "C", "V", "B", "N", "M", "ENTER"],
  ];

  const handleClassName = (keyChar) => {
    if (keyChar === "ENTER" || keyChar === "<")
      return "bg-[#333333] ml-1 rounded px-3 py-2 text-white text-lg font-bold cursor-pointer";

    if (!props.usedLetters || props.usedLetters.length === 0) {
      return "bg-[#333333] rounded px-3 py-2 text-white text-lg font-bold cursor-pointer";
    }

    const usedLetter = props.usedLetters.find(({ char }) => char === keyChar);

    if (usedLetter) {
      const { status } = usedLetter;

      if (status === "positioned") {
        return "bg-[#357465] rounded px-3 py-2 text-white text-lg font-bold cursor-pointer";
      } else if (status === "included") {
        return "bg-[#8B8F4D] rounded px-3 py-2 text-white text-lg font-bold cursor-pointer";
      } else if (status === "notinword") {
        return "bg-[#333333] rounded px-3 py-2 text-[#504E4E] text-lg font-bold cursor-pointer";
      }
    }

    return "bg-[#333333] rounded px-3 py-2 text-white text-lg font-bold cursor-pointer";
  };

  return (
    <div className="grid grid-rows-3 gap-1">
      {rows.map((row, rowIdx) => (
        <div key={rowIdx} className="flex justify-center gap-1">
          {row.map((keyChar, keyIdx) => (
            <div key={keyIdx} className={handleClassName(keyChar)}>
              {keyChar}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
