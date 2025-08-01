const statusStyles = 
{
    bloqueado: "bg-[#1D3D35] border-4 border-[#1D3D35]",
    vazio: "border-4 border-[#1D3D35]",
    ativo: "border-4 border-gray-500",
    correto: "bg-[#5dc8ae] border-4 border-[#5dc8ae] text-white",
    quase: "bg-amber-500 border-4 border-ambar-700 text-white",
    incorreto: "bg-black border-4 border-black text-white",
}

function Cell({ cell, rowIndex, indexLinhaAtual }) 
{
  let styleKey = cell.status;

  if (cell.status === 'vazio' && rowIndex === indexLinhaAtual)
  {
      styleKey = 'ativo';
  }
  const cellStyle = `border-4 rounded outline-0 text-center text-white text-4xl duration-500 ${statusStyles[cell.status] || statusStyles['empty']}`;

  return (
    <div className={cellStyle}>
      {cell.letter.toUpperCase()}
    </div>
  );
}

function Termo ({grid, indexLinhaAtual})
{
  return (
    <div className="row-span-7 mx-4 md:mx-25 my-6 grid grid-cols-5 grid-rows-6 gap-4">
      {grid.map((row, rowIndex) => 
        (
          row.map((cell, cellIndex) => 
            (
              <Cell 
                key={`${rowIndex}-${cellIndex}`} 
                cell={cell} 
                rowIndex={rowIndex}
                indexLinhaAtual={indexLinhaAtual}
              />
            )
          )
        )
      )}
    </div>
  )
}
export default Termo