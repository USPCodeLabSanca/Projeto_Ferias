import { keys } from "../utils/keys";

interface KeyboardProps {
  onKeyClick: (key: string) => void;
  usedKeys?: Record<string, "correct" | "present" | "absent">;
}

export const Keyboard = ({ onKeyClick, usedKeys = {} }: KeyboardProps) => {
  return (
    <div className="keyboard grid grid-cols-10 gap-2">
      {keys.map((l) => {
        const status = usedKeys[l.key.toUpperCase()];
        let bg = "bg-gray-500";
        if (status === "correct") bg = "bg-emerald-500";
        else if (status === "present") bg = "bg-yellow-600";
        else if (status === "absent") bg = "bg-gray-600 text-white/30";

        return (
          <button
            key={l.key}
            className={`btn uppercase rounded px-2 py-2 font-bold text-white w-auto ${bg}`}
            type="button"
            onClick={() => onKeyClick(l.key)}
          >
            {l.key}
          </button>
        );
      })}
    </div>
  );
};
