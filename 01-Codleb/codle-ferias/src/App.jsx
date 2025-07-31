import { useState, useEffect } from "react";
import words from "../assets/data/words.json";
import Background from "./Background"
import Top from "./Top"
import Termo from "./Termo"
import Bottom from "./Bottom";

const criaGrid = () =>
{
    return Array(6).fill(null).map
    (() =>
        Array(5).fill(null).map
        (() =>
        ({letter: '', status: 'vazio'})
        )
    );
};

function comparaPalavras (tentativa, solução) 
{
    const arrayTentativa = tentativa.split('');
    const arraySolução = solução.split('');

    // Array que guardará o resultado final
    const resultado = Array(5).fill(null);

    // 1ª PASSAGEM: Encontra as letras 'corretas'
    arrayTentativa.forEach((letter, index) => 
    {
        if (arraySolução[index] === letter) 
        {
            resultado[index] = 'correto';
            arraySolução[index] = null; 
        }
    });

    // 2ª PASSAGEM: Encontra as letras 'quase'
    arrayTentativa.forEach((letter, index) => 
    {
        if (resultado[index] !== null) 
        {
            return;
        }

        const presentIndex = arraySolução.indexOf(letter);
        if (presentIndex !== -1) 
        {
            resultado[index] = 'quase';
            arraySolução[presentIndex] = null;
        }
    });

    // 3ª PASSAGEM: O que sobrou é 'incorreto' 
    resultado.forEach((status, index) => 
    {
        if (status === null) 
        {
            resultado[index] = 'incorreto';
        }
    });

    return resultado;
}

function App ()
{
    const [grid, setGrid] = useState(criaGrid());
    const [keyboardStatus, setKeyboardStatus] = useState({});
    const [resposta, setResposta] = useState("");
    const [indexLinhaAtual, setIndexLinhaAtual] = useState(0);

    useEffect (() =>
    {
        const indexAleatorio = Math.floor(Math.random() * words.length);
        const palavraAleatoria = words[indexAleatorio];
        setResposta(palavraAleatoria);
    }, []);

    const tentativaEnviada = () => 
    {
        //pega a palavra da linha atual
        const linhaAtual = grid[indexLinhaAtual];
        const tentativa = linhaAtual.map(cell => cell.letter).join('');
        
        if (tentativa.length !== 5) 
        {
        alert("A palavra precisa ter 5 letras!"); //mudar depois para algo mais bonito
        return;
        }

        const resultado = comparaPalavras(tentativa, resposta);

        //atualiza o estado do grid
        const newGrid = [...grid];
        resultado.forEach((status, index) => 
        {
            newGrid[indexLinhaAtual][index].status = status;
        });
        setGrid(newGrid);

        const newKeyboardStatus = { ...keyboardStatus };

        tentativa.split('').forEach((letra, index) => 
        {
            const statusAtual = newKeyboardStatus[letra];
            const novoStatus = resultado[index];

        
            if (statusAtual === 'correto') return; // Se já é verde, não muda
            if (statusAtual === 'quase' && novoStatus !== 'correto') return; // Se é amarelo, só muda pra verde

            newKeyboardStatus[letra] = novoStatus;
        });
        setKeyboardStatus(newKeyboardStatus);

        if (tentativa === resposta) 
        {
            setTimeout(() => alert("Parabéns, você acertou!"), 500); //mudar depois para algo mais bonito
            //adicionar lógica para parar o jogo
            return; 
        }

        if (currentRowIndex === 5) 
        {
            setTimeout(() => alert(`Fim de jogo! A palavra era: ${resposta}`), 500); //mudar
            return;
        }

        setIndexLinhaAtual(indexLinhaAtual + 1);
    }

    return (
        <div>
            <Background>
                <Top/>
                <Termo grid={grid}/>
                <Bottom
                    keyboardStatus={keyboardStatus}
                    onEnterPress={tentativaEnviada}
                />
            </Background>
        </div>
    )
}
export default App