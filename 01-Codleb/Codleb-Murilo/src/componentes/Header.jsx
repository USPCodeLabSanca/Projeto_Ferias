import React from 'react'
import LogoCodeLab from '../../../assets/images/logo.png'
import {BsQuestionLg} from 'react-icons/bs'
import {TbReload} from 'react-icons/tb'

function Header() {

    const BotaoAjuda = () => {
        alert('                          Ola, seja bem-vindo ao Codle! \n O jogo funciona de maneira simples, voce deve tentar adivinhar a palavra selecionada em 6 tentativas. As letras com fundo verde estao corretas e as com fundo amarelo em ordem errada apenas. \n                                           Boa sorte! ');
        console.log('Botao de ajuda clicado');
    }

    const BotaoReload = () => {
        window.location.reload();
        console.log('Botao de reload clicado');
    }

  return (
    <>
        <header className ="flex items-center">

          <button onClick={BotaoAjuda} className="bg-transparent border-black p-1 border-[1.8px] invert rounded"> 
          <BsQuestionLg size={20}> </BsQuestionLg>
          </button>

        <div className="justify-between flex items-end p-10 p-right-15">
          <img src={LogoCodeLab} alt="CodeLab" className="w-24 h-auto" />
          <div className="font-Montserrat font-bold text-5xl pb-3 text-white">
            CODLE
          </div>
        </div>

        <button onClick={BotaoReload} className="bg-none border-black p-1 border-[1.8px] invert rounded">
          <TbReload size={20}> </TbReload>
        </button>

        </header>
    </>
  )
}

export default Header
