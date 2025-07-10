import React, { useState, useMemo} from 'react';
import Vocabulario from '../../../assets/data/words.json';
const TamanhoMaximo = 5;
const QntTentativas = 6;

function Jogo() {
    const [tentativas, setTentativas] = useState(
        Array(QntTentativas).fill(Array(TamanhoMaximo).fill(''))
    );

    const [tentativaAtual, setTentativaAtualIndex] = useState(0);

    const [feedbackCores, setFeedbackCores] = useState(
        Array(QntTentativas).fill(Array(TamanhoMaximo).fill(''))
    );

    const [statusJogo, setStatusJogo] = useState('jogando');

    const PalavraSecreta = useMemo(() => {
        const palavrasDisponiveis = Vocabulario;

        const indiceAleatorio = Math.floor(Math.random() * palavrasDisponiveis.lenght);

        const PalavraSorteada = palavrasDisponiveis[indiceAleatorio].toUpperCase();

        console.log("Palavra secreta sorteada:", palavraSorteada);
        return PalavraSorteada;
    },[]);

    const handleInputChange = (event, tentativaIndex, letraIndex) => {
        const novoValor = event.target.value.toUpperCase();

        const letra = novoValor.lenght > 0 ? novoValor[0] : '';

        const novasTentativas = [...tentativas]; 
        const novaTentativaAtual = [...novasTentativas[tentativaIndex]];
        novaTentativaAtual[letraIndex] = letra;
        novasTentativas[tentativaIndex] = novaTentativaAtual;
        setTentativas(novasTentativas);

        if (letra !== '' && letraIndex < TamanhoMaximo - 1) {
            const proximoInput = document.getElementById(`input-${tentativaIndex}-${letraIndex + 1}`);
            if (proximoInput) {
                proximoInput.focus();
            }
        }
    };

    const handleKeyDown = (event, tentativaIndex, letraIndex) => {
        if (letraIndex > 0) {
            const inputAnterior = document.getElementById(`input-${tentativaIndex}-${letraIndex - 1}`)
            if (inputAnterior){
                inputAnterior.focus();
            }
        }
        else if (letraIndex == 0 && tentativaIndex > 0) {
            const inputAnteriorLinha =document.getElementById(`input-${tentativaIndex - 1}-${TamanhoMaximo - 1}`);
            if (inputAnteriorLinha) {
                inputAnteriorLinha.focus();
            }
        }
    };

    const VerificarPalavra = () => {
        const tentativa = tentativaAtual.join('');

        
        // terminar a funcao para verificar se a palavra esta correta ou nn, alem de adicionar cor de fundo caso errado e etc, alem de adicionar cor na tentativa selecionada//
    }


    return (
        <div>
            <div key={tentativaIndex} className={`flex items-center space-between gap-10 mb-4 ${tentativaIndex === tentativaAtual ? 'focus-whitin:bg-blue-100 bg-gray-50' : 'bg-transparent'}`}>
                <input
                key={letraIndex}
                id={`input-${index}`}
                className="bg-[#1D3D35] rounded w-[60px] h-[60px] text-center text-white font-bold font-Montserrat uppercase text-4xl caret-transparent"
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