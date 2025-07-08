import { useState } from 'react'
import LogoCodeLab from '../../assets/images/logo.png'
import './App.css'
import {BsQuestionLg} from 'react-icons/bs'
import {TbReload} from 'react-icons/tb'

function App() {

  return (
    <>
      <body className=" flex flex-col items-center min-h-screen justify-start ">

      <header className ="justify-between items-center flex w-full">

        <div>
          <button className="bg-transparent border-white p-1 border-[1.8px]"> 
          <BsQuestionLg size={20}> </BsQuestionLg>
          </button>
        </div>

        <div className="justify-between flex items-end p-10 p-right-15">
          <img src={LogoCodeLab} alt="CodeLab" className="w-24 h-auto" />
          <div className="font-Montserrat font-bold text-5xl pb-3">
            CODLE
          </div>
        </div>

        <button className="bg-none border-white p-1 border-[1.8px]">
          <TbReload size={20}> </TbReload>
        </button>


      </header>

      </body>
    </>
  )
}

export default App
