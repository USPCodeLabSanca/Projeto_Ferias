import { useState } from 'react'
import './App.css'
import Header from './componentes/Header.jsx'
import Jogo from './componentes/Jogo.jsx'


function App() {

  return (
    <>
      <div className=" flex flex-col items-center min-h-screen justify-start w-full">

        <Header />
        
        <Jogo />

      </div>
    </>
  )
}

export default App
