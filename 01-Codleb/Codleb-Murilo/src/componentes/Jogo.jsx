import React, { useState, useMemo} from 'react';
import Vocabulario from '../../../assets/data/words.json';
const TAMANHO_PALAVRA = 5;
const QNT_TENTATIVAS = 6;

function Jogo() {
    const [tentativas, setTentativas] = useState(
        Array(QNT_TENTATIVAS).fill(Array(TAMANHO_PALAVRA).fill(''))
    );
    const [tentativaAtualIndex, setTentativaAtualIndex] = useState(0);
    const [feedbackCores, setFeedbackCores] = useState(
        Array(QNT_TENTATIVAS).fill(Array(TAMANHO_PALAVRA).fill(''))
    );
    const [statusJogo, setStatusJogo] = useState('jogando');

    const palavraSecreta = useMemo(() => {
        const palavrasDisponiveis = Vocabulario.words;

        if (palavrasDisponiveis.length === 0) {
            console.error("ERRO: O dicionário está vazio ou não carregado corretamente!");
            return "ERRO";
        }

        const palavrasDoTamanhoCerto = palavrasDisponiveis.filter(p => p.length === TAMANHO_PALAVRA);

        if (palavrasDoTamanhoCerto.length === 0) {
            console.error("ERRO: Nenhuma palavra do tamanho correto encontrada no dicionário!");
            return "ERRO";
        }

        const indiceAleatorio = Math.floor(Math.random() * palavrasDoTamanhoCerto.length);
        const palavraSorteada = palavrasDoTamanhoCerto[indiceAleatorio].toUpperCase();
        
        console.log("Palavra secreta sorteada:", palavraSorteada);
        return palavraSorteada; 
    }, []); 

    const handleInputChange = (event, tentativaIdx, letraIdx) => {
        if (statusJogo !== 'jogando' || tentativaIdx !== tentativaAtualIndex) return;

        const novoValor = event.target.value.toUpperCase();
        const letra = novoValor.length > 0 ? novoValor[0] : ''; 

        const novasTentativas = [...tentativas];
        const novaTentativaAtual = [...novasTentativas[tentativaIdx]];
        novaTentativaAtual[letraIdx] = letra;
        novasTentativas[tentativaIdx] = novaTentativaAtual;
        setTentativas(novasTentativas);

        if (letra !== '' && letraIdx < TAMANHO_PALAVRA - 1) {
            const proximoInput = document.getElementById(`input-${tentativaIdx}-${letraIdx + 1}`);
            proximoInput?.focus();
        }
    };

    const handleKeyDown = (event, tentativaIdx, letraIdx) => {
        if (statusJogo !== 'jogando' || tentativaIdx !== tentativaAtualIndex) return;

        if (event.key === 'Backspace' || event.key === 'Delete') {
            event.preventDefault();

            const novasTentativas = [...tentativas];
            const novaTentativaAtual = [...novasTentativas[tentativaIdx]];

            if (novaTentativaAtual[letraIdx] !== '') {
                novaTentativaAtual[letraIdx] = '';
                setTentativas(novasTentativas);
            }
            else if (letraIdx > 0) {
                const inputAnterior = document.getElementById(`input-${tentativaIdx}-${letraIdx - 1}`);
                if (inputAnterior) {
                    inputAnterior.focus();
                    novaTentativaAtual[letraIdx - 1] = ''; 
                    setTentativas(novasTentativas);
                }
            }

            else if(letraIdx === 0 && tentativaIdx > 0) {
                const inputAnteriorLinha = document.getElementById(`input-${tentativaIdx - 1}-${TAMANHO_PALAVRA - 1}`);
                if (inputAnteriorLinha) {
                    const prevRow = [...novasTentativas[tentativaIdx - 1]];
                    prevRow[TAMANHO_PALAVRA - 1] = '';
                    novasTentativas[tentativaIdx - 1] = prevRow;
                    setTentativas(novasTentativas);
                    inputAnteriorLinha.focus();
                }
            }

        } else if (event.key === 'Enter') {
            if (letraIdx === TAMANHO_PALAVRA - 1 && tentativas[tentativaIdx][letraIdx] !== '') {
                 VerificarPalavra();
            }
        }
    };

    const VerificarPalavra = () => {
        const palavraDigitadaArray = tentativas[tentativaAtualIndex];
        const palavraDigitada = palavraDigitadaArray.join('');

        if (palavraDigitada.length !== TAMANHO_PALAVRA) {
            alert(`Por favor, preencha todas as ${TAMANHO_PALAVRA} letras.`);
            return; 
        }

        if (!Vocabulario.words.includes(palavraDigitada.toLowerCase())) { 
            alert('Palavra inválida. Não está no nosso dicionário.');
            return;
        }

        const novoFeedbackCores = [...feedbackCores];
        const coresDaTentativaAtual = Array(TAMANHO_PALAVRA).fill('');

        const contagemLetrasPalavraSecreta = {};
        for (const char of palavraSecreta) {
            contagemLetrasPalavraSecreta[char] = (contagemLetrasPalavraSecreta[char] || 0) + 1;
        }

        for (let i = 0; i < TAMANHO_PALAVRA; i++) {
            if (palavraDigitada[i] === palavraSecreta[i]) {
                coresDaTentativaAtual[i] = 'bg-green-500';
                contagemLetrasPalavraSecreta[palavraDigitada[i]]--;
            }
        }

        for (let i = 0; i < TAMANHO_PALAVRA; i++) {
            if (coresDaTentativaAtual[i] === '') { 
                if (
                    palavraSecreta.includes(palavraDigitada[i]) && 
                    contagemLetrasPalavraSecreta[palavraDigitada[i]] > 0 
                ) {
                    coresDaTentativaAtual[i] = 'bg-yellow-500'; 
                    contagemLetrasPalavraSecreta[palavraDigitada[i]]--;
                } else {
                    coresDaTentativaAtual[i] = 'bg-gray-500';
                }
            }
        }
        novoFeedbackCores[tentativaAtualIndex] = coresDaTentativaAtual;
        setFeedbackCores(novoFeedbackCores); 

        if (palavraDigitada === palavraSecreta) {
            alert("Parabéns! Você acertou a palavra: " + palavraSecreta);
            setStatusJogo('ganhou');
        } else if (tentativaAtualIndex === QNT_TENTATIVAS - 1) {
            alert("Game Over! A palavra era: " + palavraSecreta);
            setStatusJogo('perdeu'); 
        } else {
            setTentativaAtualIndex(tentativaAtualIndex + 1);
            setTimeout(() => {
                const proximoInput = document.getElementById(`input-${tentativaAtualIndex + 1}-0`);
                proximoInput?.focus();
            }, 50); 
        }
    };

    const reiniciarJogo = () => {
        setTentativas(Array(QNT_TENTATIVAS).fill(Array(TAMANHO_PALAVRA).fill('')));
        setTentativaAtualIndex(0);
        setFeedbackCores(Array(QNT_TENTATIVAS).fill(Array(TAMANHO_PALAVRA).fill('')));
        setStatusJogo('jogando');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-96 mx-auto my-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Jogo Codle</h2>

            {}
            {tentativas.map((tentativa, tentativaIndex) => (
                <div
                    key={tentativaIndex}
                    className={`flex justify-center space-x-2 mb-2 p-1 rounded-md transition-colors duration-200
                               ${tentativaIndex === tentativaAtualIndex ? 'focus-within:bg-blue-100 bg-gray-50' : 'bg-transparent'}
                               ${tentativaAtualIndex > tentativaIndex ? 'bg-gray-200' : ''}
                               ${tentativaIndex === tentativaAtualIndex && statusJogo === 'jogando' ? 'border-2 border-dashed border-blue-400' : ''}`}
                >
                    {}
                    {tentativa.map((letra, letraIndex) => (
                        <input
                            key={letraIndex} 
                            id={`input-${tentativaIndex}-${letraIndex}`} 
                            type="text"
                            placeholder=" "
                            maxLength="1" 
                            value={letra} 
                            onChange={(event) => handleInputChange(event, tentativaIndex, letraIndex)}
                            onKeyDown={(event) => handleKeyDown(event, tentativaIndex, letraIndex)}
                            disabled={tentativaIndex !== tentativaAtualIndex || statusJogo !== 'jogando'}
                            className={`w-[60px] h-[60px] p-0 border border-gray-300 rounded-md shadow-sm
                                       text-white text-center text-3xl font-bold uppercase caret-transparent
                                       ${feedbackCores[tentativaIndex][letraIndex]} // <<< APLICA A COR DE FEEDBACK AQUI
                                       ${statusJogo === 'jogando' && tentativaIndex === tentativaAtualIndex ? 'bg-[#1D3D35]' : ''} // Fundo da célula ativa (cor escura do tema)
                                       ${statusJogo === 'jogando' && tentativaIndex !== tentativaAtualIndex ? 'bg-gray-600' : ''} // Fundo de células de linhas não ativas
                                       ${statusJogo !== 'jogando' ? 'opacity-80' : ''} // Diminui opacidade após o jogo
                                       focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500`}
                        />
                    ))}
                </div>
            ))}

            {}
            {statusJogo === 'jogando' && (
                <button
                    onClick={VerificarPalavra}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                >
                    Verificar Palavra
                </button>
            )}

            {statusJogo !== 'jogando' && (
                <button
                    onClick={reiniciarJogo}
                    className="mt-4 bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600"
                >
                    Jogar Novamente
                </button>
            )}

            {}
            <p className="mt-4 text-sm text-gray-500">
                Palavra Secreta (para teste): {palavraSecreta}
            </p>
        </div>
    );
}

export default Jogo;