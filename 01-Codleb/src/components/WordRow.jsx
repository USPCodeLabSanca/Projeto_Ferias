import CharTermo from "./CharTermo";

export default function WordRow(){
  return(
    <div className="flex gap-4">
      {[...Array(5)].map((__, index) => (
        <CharTermo key={index} />
      ))}
    </div>
  )
}