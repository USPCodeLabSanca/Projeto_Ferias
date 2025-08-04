import { NUM_ATTEMPTS } from "../utils/constants";

type CellProps = {
  letter: string;
  status: "correct" | "present" | "absent" | "";
};

type BoardProps = {
  board: CellProps[][];
};

const getCellClasses = (status: CellProps["status"]) => {
  switch (status) {
    case "correct":
      return "bg-emerald-500 text-white border-emerald-500";
    case "present":
      return "bg-yellow-600 text-white border-yellow-600";
    case "absent":
      return "bg-gray-600 text-white/50 border-gray-600";
    default:
      return "bg-emerald-900 border-emerald-900 text-black";
  }
};

export const Board = ({ board }: BoardProps) => {
  return (
    <div
      className="grid gap-2 my-8"
      style={{ gridTemplateRows: `repeat(${NUM_ATTEMPTS}, auto)` }}
    >
      {board.map((row, i) => (
        <div key={i} className="flex gap-2">
          {row.map((cell, j) => (
            <div
              key={j}
              className={`
                w-14 h-14 border-2 rounded flex items-center justify-center
                text-2xl font-bold shadow uppercase select-none
                ${getCellClasses(cell.status)}
              `}
            >
              {cell.letter}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
