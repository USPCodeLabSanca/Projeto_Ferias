import { useState, useEffect, useRef } from "react";
import words from "../assets/data/words.json";

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

function useLogic ()
{
    const [grid, setGrid] = useState(criaGrid());
    const [keyboardStatus, setKeyboardStatus] = useState({});
    const [resposta, setResposta] = useState("");
    const [indexLinhaAtual, setIndexLinhaAtual] = useState(0);
    const [foco, setFoco] = useState({linha:0, coluna:0});
    const guardaFunções = useRef();
    const inputRefs = useRef(Array(6).fill(null).map(() => Array(5).fill(null)));

    const atualizaFoco = (linha, coluna) =>
    {
        if (linha == indexLinhaAtual)
        {
            setFoco({linha, coluna});
        }
    }

    // Função para adicionar uma letra
    const teclar = (key) => 
    {
        if (indexLinhaAtual > 5) return;

        const {linha, coluna} = foco;

        if (linha !== indexLinhaAtual) return;

        setGrid(prevGrid => 
        {
            const newGrid = [...prevGrid];
            const celulaAtual = newGrid[linha][coluna];

            if (newGrid[linha][coluna].letter === '') 
            {
                newGrid[linha][coluna].letter = key.toUpperCase();

                const proximaVazia = newGrid[linha].findIndex
                (
                    (cell, index) => index > coluna && cell.letter === ''
                );

                if (proximaVazia !== -1) 
                {
                    // Se encontrou um espaço vazio à frente, foca nele
                    setFoco({ linha, coluna: proximaVazia });
                } 
                else 
                {
                    // Se não encontrou, procura por um espaço vazio antes da posição atual
                    const primeiraVazia = newGrid[linha].findIndex
                    (
                        (cell, index) => index < coluna && cell.letter === ''
                    );
                
                    if (primeiraVazia !== -1) 
                    {
                        // Se encontrou, foca nesse espaço
                        setFoco({ linha, coluna: primeiraVazia });
                    }
                }
            }

            return newGrid;
        });
    };

    // Função para apagar a última letra
    const apagar = () => 
    {
        if (indexLinhaAtual > 5) return;

        const { linha, coluna } = foco;

        if (linha !== indexLinhaAtual) return;

        setGrid(prevGrid => 
        {
            const newGrid = [...prevGrid];
            const celulaAtual = newGrid[linha][coluna];

            if (celulaAtual.letter !== '') 
            {
                celulaAtual.letter = '';
            }
            
            return newGrid;
        });
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

        //atualiza o estado do grid
        setGrid (prevGrid =>
        {
            const newGrid = [...prevGrid];

            resultado.forEach((status, index) => 
            {
               newGrid[indexLinhaAtual][index].status = status;
            });

            return newGrid;
        })

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

        setIndexLinhaAtual(prevIndex => prevIndex + 1);
        setFoco({ linha: indexLinhaAtual + 1, coluna: 0 })   
    }

    //USE EFFECTS
    //importa uma palavra aleatória de words.json para ser a resposta
    useEffect (() =>
    {
        const listaDePalavras = words.words;
        const indexAleatorio = Math.floor(Math.random() * listaDePalavras.length);
        const palavraAleatoria = listaDePalavras[indexAleatorio].toUpperCase();  //a palavra secreta precisa ser maiúscula para não dar incorreto na comparação com a palavra tentada

        setResposta(palavraAleatoria);
    }, []);

    //controla o foco do input
    useEffect(() => 
    {
        inputRefs.current[foco.linha][foco.coluna]?.focus();
    }, [foco]); // Roda toda vez que o estado 'foco' muda

    useEffect(() => 
    {
        guardaFunções.current = { teclar, apagar, tentativaEnviada };
    });

    useEffect(() => 
    {
        const pressionar = (event) => 
        {
            const {key} = event;

            // Acessa as funções mais recentes através da ref
            const { teclar, apagar, tentativaEnviada } = guardaFunções.current;

            if (key === 'Enter') 
            {
                tentativaEnviada();
            } 
            else if (key === 'Backspace') 
            {
                apagar();
            } 
            else if (/^[a-zA-Z]$/.test(key)) 
            {
                teclar(key);
            }
        };

        window.addEventListener('keydown', pressionar);

        return () => 
        {
            window.removeEventListener('keydown', pressionar);
        };

    }, []);

    return {
        grid,
        keyboardStatus,
        indexLinhaAtual,
        inputRefs,
        atualizaFoco,
        teclar,
        apagar,
        tentativaEnviada,
    };
}
export default useLogic