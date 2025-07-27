import WordRow from "./WordRow";

export default function Grid() {
  return (
    <div className="flex flex-col gap-4">
      {[...Array(6)].map((_,index) => (
        <WordRow key={index} />
      ))}
    </div>
  )
}