import { useState } from 'react'
import './App.css'

function App() {
  return (
    <>
      <h1>入力フォーム</h1>
      <InputForm />
    </>
  )
}

function InputForm(){
  const [val, setVal] = useState("")
  return(
    <>
      <input value={val} onChange={(e) => setVal(e.target.value)}></input>
      <p>{val}</p>
    </>
  )
}
export default App
