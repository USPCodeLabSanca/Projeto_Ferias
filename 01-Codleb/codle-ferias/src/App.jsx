import Background from "./Background"
import Top from "./Top"
import Termo from "./Termo"
import Bottom from "./Bottom";

function App ()
{
    return (
        <div>
            <Background>
                <Top/>
                <Termo/>
                <Bottom/>
            </Background>
        </div>
    )
}
export default App