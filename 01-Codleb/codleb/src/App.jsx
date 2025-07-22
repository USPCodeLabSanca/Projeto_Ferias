import { useState } from 'react'
import './App.css'

function App() {
  return (
    <div className='flex flex-col justify-center gap-y-[50px]'>
      <div title='header' className='flex flex-row justify-evenly w-full'>
        <button title='help-button' className='buttons'>
          <p className='font-inter font-bold text-[20px] w-[20px]'>?</p>
        </button>

        <div title='Title' className='flex flex-row justify-center'>
          <img src='/src/assets/logo.png' className='h-[80px] w-[80px]'></img>
          <h1 className='font-bold text-[48px] font-montserrat'>CODLE</h1>
        </div>

        <button title='reload-button' className='buttons'>
          <img src='/src/assets/reload.png' className='h-[20px] w-[20px]'></img>
        </button>
      </div>

      <div title='Game' className='flex flex-col gap-y-[15px]'>
        <TryWord/>
        <TryWord/>
        <TryWord/>
        <TryWord/>
        <TryWord/>
        <TryWord/>
      </div>

      <div title='KeyBoard' className='flex flex-col gap-y-[10px]'>
        <KeyboardRow row='1'/>
        <KeyboardRow row='2'/>
        <KeyboardRow row='3'/>
      </div>
    </div>
  );
}


const KeyboardRow = ({row}) => {
  let letters = [];
  if (row === '1'){
    letters = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  }
  else if(row === '2'){
    letters = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  }
  else if(row === '3'){
    letters = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];
  }
  
  return (
    <div className='flex flex-row justify-center gap-x-[5px]'>
      {letters.map((letterValue) => {
        return (
          <KeyboardLetterBox key={letterValue} letter={letterValue}/>
        );
      })}
      {row === '2' && <button className='keyboardLetters font-bold text-[20px] w-[32px] h-[45px]'>{'<'}</button>}
      {row === '3' && <button className='keyboardLetters font-bold text-[20px] w-[116px] h-[45px]'>ENTER</button>}
    </div>
  );
}

const KeyboardLetterBox = (props) => {
  return (
    <button className='keyboardLetters w-[36px] h-[45px]'>
      <p className='font-bold text-[20px]'>{props.letter}</p>
    </button>
  );
}

const TryWord = () => {

  return (
    <section className='words'>
      <LettersBox letter="C"/>
      <LettersBox letter="O"/>
      <LettersBox letter="D"/>
      <LettersBox letter="L"/>
      <LettersBox letter="E"/>
    </section>
  );
}

const LettersBox = (props) => {
  return (
    <div className='lettersBox'>
      <p className='letters font-montserrat'>{props.letter}</p>
    </div>
  );
}


export default App
