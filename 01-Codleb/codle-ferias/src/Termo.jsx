const statusStyles = 
{
  bloqueado: "bg-[#1D3D35] border-4 border-[#1D3D35]",
  vazio: "border-4 border-[#1D3D35]",
  correto: "bg-[#5dc8ae] border-4 border-[#5dc8ae] text-white",
  quase: "bg-amber-400 border-4 border-amber-400 text-white",
  incorreto: "bg-black border-4 border-black text-white",
}

function Cell({ cell, rowIndex, cellIndex, indexLinhaAtual, inputRefs, onCellFocus }) 
{
  let styleKey = cell.status;

  if (cell.status === 'bloqueado' && rowIndex === indexLinhaAtual)
  {
    styleKey = 'vazio';
  }
  const cellStyle = `border-4 rounded outline-0 text-center text-white text-4xl focus:border-b-[#5dc8ae] duration-500 ${statusStyles[styleKey]}`;

  //lógica de navegação com as setas do teclado
  const setas = (e) => 
  {
    if (e.key === 'ArrowRight' && cellIndex < 4) 
    {
      onCellFocus(rowIndex, cellIndex + 1);
    } 
    else if (e.key === 'ArrowLeft' && cellIndex > 0) 
    {
      onCellFocus(rowIndex, cellIndex - 1);
    }

  };

  return (
    <input
      ref={el => inputRefs.current[rowIndex][cellIndex] = el} // atribui a ref a este input
      type="text"
      maxLength="1" // Garante que apenas uma letra seja inserida
      className={cellStyle}
      value={cell.letter} // O valor é controlado pelo estado
      disabled={rowIndex !== indexLinhaAtual} // apenas a linha ativa é editável
      readOnly
      onKeyDown={setas} // adiciona a navegação por setas
      onClick={() => onCellFocus(rowIndex, cellIndex)}
    />
  )
}

function Termo ({grid, indexLinhaAtual, inputRefs, onCellFocus})
{
  return (
    <div className="row-span-7 mx-10 md:mx-25 mb-6 mt-14 grid grid-cols-5 grid-rows-6 gap-4">
      {grid.map((row, rowIndex) => 
        (
          row.map((cell, cellIndex) => 
            (
              <Cell 
                key={`${rowIndex}-${cellIndex}`} 
                cell={cell} 
                rowIndex={rowIndex}
                cellIndex={cellIndex}
                indexLinhaAtual={indexLinhaAtual}
                inputRefs={inputRefs}
                onCellFocus={onCellFocus}
              />
            )
          )
        )
      )}
    </div>
  )
}
export default Termo