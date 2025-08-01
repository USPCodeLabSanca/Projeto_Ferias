import { useState, useEffect } from "react";
import words from "../assets/data/words.json";
console.log("Arquivo JSON importado:", words);

import Background from "./Background"
import Top from "./Top"
import Termo from "./Termo"
import Bottom from "./Bottom";


const criaGrid = () =>
{
    return Array(6).fill(null).map
    ((_, rowIndex) =>
        Array(5).fill(null).map
        (() =>
        ({
            letter: '', 
            status: rowIndex === 0 ? "vazio" : "bloqueado"
        }))
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

    //importa uma palavra aleatória de words.json para ser a resposta
    useEffect (() =>
    {
        const listaDePalavras = words.words;
        const indexAleatorio = Math.floor(Math.random() * listaDePalavras.length);
        const palavraAleatoria = listaDePalavras[indexAleatorio].toUpperCase();  //a palavra secreta precisa ser maiúscula para não dar incorreto na comparação com a palavra tentada
        console.log("Palavra Sorteada com Sucesso:", palavraAleatoria);

        setResposta(palavraAleatoria);
    }, []);

    //função para integrar o teclado físico
    useEffect(() => 
    {
        const pressionar = (event) => 
        {
            if (event.key === 'Enter') 
            {
                tentativaEnviada();
            }  
            else if (event.key === 'Backspace')    
            {
                apagar();
            } 
            else if (/^[a-zA-Z]$/.test(event.key)) 
            {
                // A regex testa se a tecla é uma única letra (a-z ou A-Z)
                teclar(event.key);
            }
        };

        window.addEventListener('keydown', pressionar);

        // Função de limpeza: remove o ouvinte quando o componente for desmontado
        return () => 
        {
            window.removeEventListener('keydown', pressionar);
        };
    }, [grid, indexLinhaAtual, resposta]);


    // Função para adicionar uma letra
    const teclar = (key) => 
    {
        if (indexLinhaAtual > 5) return;

        const linhaAtual = grid[indexLinhaAtual];
        // Encontra o índice da primeira célula vazia na linha atual
        const targetIndex = linhaAtual.findIndex(cell => cell.letter === '');

        // Se a linha já está cheia, não faz nada
        if (targetIndex === -1) return;

        const newGrid = [...grid];
        newGrid[indexLinhaAtual][targetIndex].letter = key.toUpperCase();
        setGrid(newGrid);
    };

    // Função para apagar a última letra
    const apagar = () => 
    {
        if (indexLinhaAtual > 5) return;

        const linhaAtual = grid[indexLinhaAtual];
        // Encontra o índice da última célula preenchida
        let targetIndex = -1;
        for (let i = linhaAtual.length - 1; i >= 0; i--) 
        {
            if (linhaAtual[i].letter !== '') 
            {
                targetIndex = i;
                break;
            }
        }
    
        // Se a linha já está vazia, não faz nada
        if (targetIndex === -1) return;

        const newGrid = [...grid];
        newGrid[indexLinhaAtual][targetIndex].letter = '';
        setGrid(newGrid);
    };


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
        console.log("Resultado da comparação:", resultado);

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

        
            if (statusAtual === 'correto') return;
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

        if (indexLinhaAtual === 5) 
        {
            setTimeout(() => alert(`Fim de jogo! A palavra era: ${resposta}`), 500); //mudar
            return;
        }

        setIndexLinhaAtual(prevIndex => 
        {
            return prevIndex + 1;
        });
        
    }

    return (
        <div>
            <Background>
                <Top/>
                <Termo 
                    grid={grid}
                    indexLinhaAtual={indexLinhaAtual}
                />
                <Bottom
                    keyboardStatus={keyboardStatus}
                    onEnterPress={tentativaEnviada}
                    onCharPress={teclar}
                    onBackspacePress={apagar}
                />
            </Background>
        </div>
    )
}
export default App