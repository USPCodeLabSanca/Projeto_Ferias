import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="bg-gray-900 text-white h-screen flex flex-col items-center p-4">
      <h1>CODLE</h1>
    </div>
  )
}

export default App
