import Background from "./Background"
import Top from "./Top"
import Termo from "./Termo"
import Bottom from "./Bottom"
import Logic from "./useLogic"
import ModalInstruções from "./ModalInstruções"


function App ()
{  

    const 
    {
        grid,
        keyboardStatus,
        indexLinhaAtual,
        inputRefs,
        atualizaFoco,
        teclar,
        apagar,
        tentativaEnviada,
        reiniciarJogo,
        instruçõesAberto,
        abreInstruções,
        fechaInstruções,
        statusJogo,
        resposta,
    } = Logic();

    return (
        <div>
            <Background>
                <Top
                    onReiniciar={reiniciarJogo}
                    onAbrirInstruções={abreInstruções}
                />
                <Termo 
                    grid={grid}
                    indexLinhaAtual={indexLinhaAtual}
                    inputRefs={inputRefs}
                    onCellFocus={atualizaFoco}
                    statusJogo={statusJogo}
                    resposta={resposta}
                />
                <Bottom
                    keyboardStatus={keyboardStatus}
                    onEnterPress={tentativaEnviada}
                    onCharPress={teclar}
                    onBackspacePress={apagar}
                />
            </Background>
            {instruçõesAberto && <ModalInstruções onClose={fechaInstruções}/>}
        </div>
    )
}
export default App