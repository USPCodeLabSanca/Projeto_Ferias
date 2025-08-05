// GameManager.tsx
import { useState, useEffect } from 'react';

interface MensagemProps {
    venceu: boolean;
    onClose: () => void;
    tentativas: number;
    palavraCorreta: string;
}

function Mensagem({ venceu, onClose, tentativas, palavraCorreta }: MensagemProps) {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
                {venceu ? (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Parabéns! 🎉</h2>
                        <p className="mb-6">Você acertou a palavra corretamente!</p>
                        {tentativas && (
                            <p className="mb-4">Tentativas: {tentativas}</p>
                        )}
                    </>
                ) : (
                    <>
                        <h2 className="text-2xl font-bold mb-4">Que pena! 😕</h2>
                        <p className="mb-6">Você não acertou desta vez.</p>
                        {palavraCorreta && (
                            <p className="mb-4">A palavra correta era: <span className="font-bold">{palavraCorreta}</span></p>
                        )}
                    </>
                )}
                <button
                    onClick={onClose}
                    className="bg-[#5EC8AE] hover:bg-[#4ab099] text-white px-6 py-2 rounded font-bold transition-colors"
                >
                    Fechar
                </button>
            </div>
        </div>
    );
}

interface TextBoxProps {
  id: number;
  char: string;
  status: number;
  selecionado?: boolean;
  onClick: (id: number) => void;
}

function TextBox({ id, char, status, selecionado = false, onClick }: TextBoxProps) {
  const baseClasses = "w-[72px] h-[72px] flex items-center justify-center text-5xl font-bold font-montserrat";
  
  let statusClasses = "";
  if (status === -1) {
    statusClasses = "bg-[#5EC8AE]"; // Não foi usado ainda
  } else if (status === 0) {
    statusClasses = "border-2 border-[#5EC8AE] cursor-pointer bg-[#404040] text-white"; // Está sendo usado
  } else if (status === 1) {
    statusClasses = "bg-[#8B8F4D] text-white"; // Amarelo 
  } else if (status === 2) {
    statusClasses = "bg-[#357465] text-white"; // Verde
  } else {
    statusClasses = "bg-[#404040] text-white"; // Cinza
  }

  const selectedClass = selecionado ? "border-b-8 border-[#5EC8AE]" : ""; // Caso a caixa será a selecionada

  return (
    <div
      onClick={() => onClick(id)}
      className={`${baseClasses} ${statusClasses} ${selectedClass}`}
    >
      {char}
    </div>
  );
}

interface TextLineProps {
  boxes: Array<{ id: number; char: string; status: number }>;
  selecionadoId: number;
  onBoxClick: (id: number) => void;
  lineId: number;
  activeLine: number;
}

function TextLine({ boxes, selecionadoId, onBoxClick, lineId, activeLine }: TextLineProps) {
  // Determina se esta linha é a ativa
  const isActive = lineId === activeLine;

  return (
    <div className="flex justify-center gap-5 mt-4">
      {boxes.map(box => (
        <TextBox
          key={box.id}
          id={box.id}
          char={box.char}
          status={box.status}
          selecionado={isActive && selecionadoId === box.id}
          onClick={isActive ? onBoxClick : () => {}}
        />
      ))}
    </div>
  );
}

const pegarPalavra = async () => {
    const jsonFile = await fetch("../src/assets/data/words.json");
    const allWords = (await jsonFile.json()).words;
    const randomWord = allWords[Math.floor(Math.random() * allWords.length)];
    return randomWord.toUpperCase();
};

interface GameProps {
  initialLines?: number;
  boxesPerLine?: number;
}

function Game({ initialLines = 6, boxesPerLine = 5 }: GameProps) {
    const [PALAVRA_SECRETA, setPalavraSecreta] = useState("");
    const [venceu, setVenceu] = useState(false);
    const [showMensagem, setShowMensagem] = useState(false);

    // Função para verificar letras
    const verificarLetras = (palavraDigitada: string) => {
        if (!PALAVRA_SECRETA) return []; // Para caso a palavra secreta não tenha sido carregada

        const resultado: { letra: string; status: number }[] = Array.from({ length: palavraDigitada.length }, (_, i) => ({
            letra: palavraDigitada[i],
            status: 3,
        }));

        const letrasRestantes = PALAVRA_SECRETA.split('');

        // Primeiro passo: letras corretas (verde)
        for (let i = 0; i < palavraDigitada.length; i++) {
            if (palavraDigitada[i] === PALAVRA_SECRETA[i]) {
                resultado[i].status = 2; // verde
                letrasRestantes[i] = ''; // Remove a letra da palavra secreta
            }
        }

        // Segundo passo: letras presentes mas fora do lugar (amarelo)
        for (let i = 0; i < palavraDigitada.length; i++) {
            if (resultado[i].status === 3) { // Só se ainda está cinza
                const index = letrasRestantes.indexOf(palavraDigitada[i]);
                if (index !== -1) {
                    resultado[i].status = 1; // amarelo
                    letrasRestantes[index] = '';
                }
            }
        }

        return resultado;
    };

    // Carregar a palavra secreta
    useEffect(() => {
        const carregarPalavra = async () => {
            const palavra = await pegarPalavra();
            setPalavraSecreta(palavra);
        };
        carregarPalavra();
    }, []);

    // Função auxiliar para criar linhas
    const createEmptyLine = (lineId: number, status: number) => ({
        id: lineId,
        boxes: Array.from({ length: boxesPerLine }, (_, i) => ({ id: i, char: ' ', status })),
    });

    const [activeLine, setActiveLine] = useState(0); // Primeira linha
    const [selecionadoId, setSelecionadoId] = useState(0); // Primeira caixa

    // Cria um array de linhas e define o primeiro como status 0
    const [lines, setLines] = useState(
        Array.from({ length: initialLines }, (_, i) => createEmptyLine(i, i === 0 ? 0 : -1))
    );

    // Lida com os cliques nas caixas, a caixa clicada passa a ser a selecionada
    const handleBoxClick = (id: number) => {
        setSelecionadoId(id);
    };

    // Atualiza o estado das linhas, se a linha tem o índice da linha ativa, suas caixas devem ser atualizadas.
    const updateActiveLineBoxes = (newBoxes: Array<{ id: number; char: string; status: number }>) => {
        setLines(lines.map((line, index) => 
            index === activeLine ? { ...line, boxes: newBoxes } : line
        ));
    };
  
    // Lidando com o teclado
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const currentLine = lines[activeLine]; // Pega a linha ativa das linhas

            // Para letras
            if (e.key.length === 1 && e.key.match(/[a-zA-Z]/)) {
                const newChar = e.key.toUpperCase(); // Tudo digitado passa a ser maiúsculo

                const newBoxes = currentLine.boxes.map(box => 
                    box.id === selecionadoId ? { ...box, char: newChar } : box
                ); // A caixa atual é atualizada
            
                updateActiveLineBoxes(newBoxes); // Atualiza a linha
            
                if (selecionadoId < currentLine.boxes.length) {
                    setSelecionadoId(selecionadoId + 1);
                } // Se não estrapolar o limite de caixas, vai uma para frente
            }

            // Leitura do teclado para backspace e delete
            if (e.key === 'Backspace' || e.key === 'Delete') {
                let newId = selecionadoId;
                
                if (e.key === 'Backspace' && selecionadoId > 0 && (selecionadoId === currentLine.boxes.length || currentLine.boxes[selecionadoId].char === ' ')) {
                    newId = selecionadoId - 1;
                }

                const newBoxes = currentLine.boxes.map(box => 
                    box.id === newId ? { ...box, char: ' ' } : box
                );

                updateActiveLineBoxes(newBoxes);
                
                if (e.key === 'Backspace' && selecionadoId > 0) {
                    setSelecionadoId(newId);
                }
            }

            // Para setas (transitar na mesma linha)
            if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
            
                let newSelectedId = selecionadoId;

                switch (e.key) {
                    case 'ArrowLeft':
                        newSelectedId = Math.max(0, selecionadoId - 1);
                        break;
                    case 'ArrowRight':
                        newSelectedId = Math.min(currentLine.boxes.length - 1, selecionadoId + 1);
                        break;
                }

                setSelecionadoId(newSelectedId);
            }

            // Submeter resposta
            if (e.key === 'Enter') {
                const allFilled = currentLine.boxes.every(box => box.char.trim() !== '');
                if (allFilled && PALAVRA_SECRETA) {
                    const palavraDigitada = currentLine.boxes.map(box => box.char).join('');
                    const resultado = verificarLetras(palavraDigitada);
                    const acertouPalavra = PALAVRA_SECRETA === palavraDigitada

                    console.log(PALAVRA_SECRETA);
                    if (acertouPalavra) {
                        setVenceu(true);
                        setShowMensagem(true);
                    } else if (activeLine === initialLines - 1) {
                        // Última linha e não acertou
                        setVenceu(false);
                        setShowMensagem(true);
                    }

                    // Atualiza TODAS as linhas (não só as boxes)
                    const newLines = lines.map((line, idx) => {
                        if (idx === activeLine) {
                            return {
                                ...line,
                                boxes: line.boxes.map((box, i) => ({ ...box, status: resultado[i]?.status || 0}))
                            };
                        } else if (idx === activeLine + 1 && !acertouPalavra) {
                            return { 
                                ...line, 
                                boxes: line.boxes.map(box => ({ ...box, status: 0 })),
                            };
                        }
                        return line;
                    });
                    
                    setLines(newLines);
                    setActiveLine(activeLine + 1);
                    setSelecionadoId(0);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selecionadoId, activeLine, lines]);

  // Retorna as linhas
  return (
    <div className='mt-10'>
      {lines.map((line) => (
        <TextLine 
          key={line.id}
          boxes={line.boxes}
          selecionadoId={selecionadoId}
          onBoxClick={handleBoxClick}
          lineId={line.id}
          activeLine={activeLine}
        />
      ))}

      {showMensagem && (
        <Mensagem 
            venceu={venceu}
            onClose={() => setShowMensagem(false)}
            tentativas={activeLine}
            palavraCorreta={PALAVRA_SECRETA}
        />
      )}
    </div>
  );
}

export default Game;