import Logo from "./Logo"
import Sorteio from "./Sorteio"
import Layout from "./Layout"
import './App.css'

function App() {
  return ( <div className="termo">
    <div className="base">
    <Logo/> 
    <Layout />
    </div>

    <div className="esconderessapraga">
      <Sorteio />
    </div>

    </div>
  )
}

export default App