import Background from "./Background"
import Top from "./Top"
import Termo from "./Termo"
import Bottom from "./Bottom"
import Logic from "./useLogic"


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
    } = Logic();

    return (
        <div>
            <Background>
                <Top/>
                <Termo 
                    grid={grid}
                    indexLinhaAtual={indexLinhaAtual}
                    inputRefs={inputRefs}
                    onCellFocus={atualizaFoco}
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