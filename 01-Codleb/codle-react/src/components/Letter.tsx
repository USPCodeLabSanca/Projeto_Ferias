interface LetterProps {
  value: string;
}

function Letter({value}: LetterProps) {
  return (
    <div className="w-14 h-14 border-2 border-gray-400 flex items-center justify-center text-2xl font-bold uppercase">
      {value}
    </div>
  );
}

export default Letter;
