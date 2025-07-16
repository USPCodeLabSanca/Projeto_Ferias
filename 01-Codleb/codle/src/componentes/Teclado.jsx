export default function Teclado({ letrasUsadas, onKeyClick }) {
    const layoutTeclado = [
      ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
      ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'BACKSPACE'],
      ['Z', 'X', 'C', 'V', 'B', 'N', 'M', 'ENTER']
    ];
  
    return (
      <div className="flex flex-col items-center mt-4">
        {layoutTeclado.map((linha, indexLinha) => (
          <div key={indexLinha} className="flex gap-1 my-1">
            {linha.map((letra) => {
              const cor = letrasUsadas[letra]; // pega a cor da letra (verde, amarelo, cinza)
              
              // define as classes de cor do Tailwind
              const corClasses = {
                cinza: 'bg-gray-700 hover:bg-gray-600',
                amarelo: 'bg-yellow-500 hover:bg-yellow-400',
                verde: 'bg-green-500 hover:bg-green-400',
                default: 'bg-gray-500 hover:bg-gray-400'
              };
  
              const classesBotao = `
                h-12 rounded font-bold uppercase text-white flex items-center justify-center transition-colors
                ${corClasses[cor] || corClasses.default}
                ${letra.length > 1 ? 'px-4 text-xs' : 'w-10 text-xl'}
              `;
  
              return (
                <button
                  key={letra}
                  className={classesBotao}
                  onClick={() => onKeyClick(letra)} 
                >
                  {letra === 'BACKSPACE' ? '⌫' : letra}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }