import React from 'react'
import Letra from './Letra'


export default function Textbox() {
    return(
      <div className="container">
        <div className="linha">
          <Letra pos={0} tentativa={0}/>
          <Letra pos={1} tentativa={0}/>
          <Letra pos={2} tentativa={0}/>
          <Letra pos={3} tentativa={0}/>
          <Letra pos={4} tentativa={0}/>
        </div>
        <div className="linha">
          <Letra pos={0} tentativa={1}/>
          <Letra pos={1} tentativa={1}/>
          <Letra pos={2} tentativa={1}/>
          <Letra pos={3} tentativa={1}/>
          <Letra pos={4} tentativa={1}/>
        </div>
        <div className="linha">
          <Letra pos={0} tentativa={2}/>
          <Letra pos={1} tentativa={2}/>
          <Letra pos={2} tentativa={2}/>
          <Letra pos={3} tentativa={2}/>
          <Letra pos={4} tentativa={2}/>
        </div>
        <div className="linha">
          <Letra pos={0} tentativa={3}/>
          <Letra pos={1} tentativa={3}/>
          <Letra pos={2} tentativa={3}/>
          <Letra pos={3} tentativa={3}/>
          <Letra pos={4} tentativa={3}/>
        </div>
        <div className="linha">
          <Letra pos={0} tentativa={4}/>
          <Letra pos={1} tentativa={4}/>
          <Letra pos={2} tentativa={4}/>
          <Letra pos={3} tentativa={4}/>
          <Letra pos={4} tentativa={4}/>
        </div>
        <div className="linha">
          <Letra pos={0} tentativa={5}/>
          <Letra pos={1} tentativa={5}/>
          <Letra pos={2} tentativa={5}/>
          <Letra pos={3} tentativa={5}/>
          <Letra pos={4} tentativa={5}/>
        </div>
      </div>
    )
}