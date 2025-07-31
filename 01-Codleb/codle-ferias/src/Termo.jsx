const statusStyles = 
{
    bloqueado: "bg-[#1D3D35] border-4 border-[#1D3D35]",
    vazio: "border-4 border-[#1D3D35]",
    correto: "bg-[#5dc8ae] border-4 border-[#5dc8ae] text-white",
    quase: "bg-ambar-700 border-4 border-ambar-700 text-white",
    incorreto: "bg-black border-4 border-black text-white",
}

function Cell({ cell }) {
  const cellStyle = `border-4 rounded outline-0 text-center text-white text-4xl duration-500 ${statusStyles[cell.status] || statusStyles['empty']}`;

  // Usamos um div em vez de input por enquanto para simplificar a exibição.
  // Depois podemos adicionar a lógica de digitação.
  return (
    <div className={cellStyle}>
      {cell.letter.toUpperCase()}
    </div>
  );
}

function Termo ({grid})
{
    return (
        <div className="row-span-7 mx-4 md:mx-25 my-6 grid grid-cols-5 grid-rows-6 gap-4">
            {grid.map((row, rowIndex) => 
            (
                row.map((cell, cellIndex) => 
                (
                    <Cell key={`${rowIndex}-${cellIndex}`} cell={cell} />
                ))
            ))}
        </div>
    )
}
export default Termo