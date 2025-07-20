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
        <section className='words'>
          <div className='lettersBox'>
            <p className='letters font-montserrat'>C</p>
          </div>
          <div className='lettersBox'>
            <p className='letters font-montserrat'>O</p>
          </div>
          <div className='lettersBox'>
            <p className='letters font-montserrat'>D</p>
          </div>
          <div className='lettersBox'>
            <p className='letters font-montserrat'>L</p>
          </div>
          <div className='lettersBox'>
            <p className='letters font-montserrat'>E</p>
          </div>
        </section>
      </div>

      <div title='KeyBoard'>
        
      </div>
    </div>
  )
}

export default App
