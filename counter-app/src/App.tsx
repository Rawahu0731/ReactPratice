import { useState } from 'react'
import './App.css'
type CounterProps = {
  num: number
  setNumber: React.Dispatch<React.SetStateAction<number>>
}

function App() {
  const [number, setNumber] = useState(0)
 
  return (
    <>
      <h1>カウンターアプリ</h1>
      <Counter num = {number} setNumber={setNumber}/>
    </>
  )
}

function Counter({num, setNumber} : CounterProps){
  function increment(){
    setNumber(num + 1)
  }
  function decrement(){
    setNumber(num - 1)
  }
  function reset(){
    setNumber(0)
  }
  return (
    <>
      <p>{num}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>reset</button>
      <button onClick={decrement}>-</button>
    </>
  )
}

export default App
