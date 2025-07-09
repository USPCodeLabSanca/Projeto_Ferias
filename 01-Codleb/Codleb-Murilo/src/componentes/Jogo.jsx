import React from 'react';
import Vocabulario from '../../../assets/data/words.json';
const TamanhoMaximo = 5;
const QntTentativas = 6;

function Jogo() {
    const [TentativaAtual, setTentativaAtual] = React.useState(Array(5).fill('') );

    const PalavraSecreta = useMemo(() => {
        const palavrasDisponiveis = Vocabulario;

        const indiceAleatorio = Math.floor(Math.random() * palavrasDisponiveis.lenghth);

        const PalavraSorteada = palavrasDisponiveis[indiceAleatorio].toUpperCase();

        console.log("Palavra secreta sorteada:", palavraSorteada);
        return PalavraSorteada;
    },[]);

    const handleInputChange = (event, index) => {
        const novoValor = event.target.value.toUpperCase();

        const letra = novoValor.lenght > 0 ? novoValor[0] : '';

        const novaTentativa = [...TentativaAtual];

        novaTentativa[0] = letra;

        setTentativaAtual(novaTentativa);

        if (letra !== '' && index < TamanhoMaximo - 1) {
            const proximoInput = document.getElementById(`input-${index + 1}`);
            if (proximoInput) {
                proximoInput.focus();
            }
        }
    };

    const handleKeyDown = (event, index) => {
        if (event.key === 'Backspace' && tentativaAtual[index] === '' && index > 0) {
            const inputAnterior = document.getElementById(`input-${index - 1}`);
            if (inputAnterior) {
                inputAnterior.focus();
            }
        }
    };

    const VerificarPalavra = () => {
        const tentativa = tentativaAtual.join('');
        // terminar a funcao para verificar se a palavra esta correta ou nn, alem de adicionar cor de fundo caso errado e etc, alem de adicionar cor na tentativa selecionada//
    }


    return (
        <div>
            <div id="tentativa1" className="flex items-center space-between gap-10">
                <input
                key={index}
                id={`input-${index}`}
                className="bg-[#1D3D35] rounded w-[60px] h-[60px] text-center text-white font-bold font-Montserrat uppercase text-4xl caret-transparent focus-outline-[#5EC8AE]"
                placeholder=" " 
                type="text"
                value={TentativaAtual[index]}
                onChange={(event) => handleInputChange(event, index)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                maxLength="1"
                />
            </div>
        </div>

    )

}

export default Jogo;