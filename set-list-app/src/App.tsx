import { useState } from 'react'
import './App.css'

type PlusMinusProps = {
  handlePlus: () => void;
  handleMinus: () => void;
};

function App() {
  const [correctCnt, setCorrectCnt] = useState(0);
  const [ApredictionCnt, setApredictionCnt] = useState(0);
  const [BpredictionCnt, setBpredictionCnt] = useState(0);

  function handlePlus(){
    
  }
  function handleMinus(){
  }
  
  return (
    <>
      <h1>Set List App</h1>
      <div className="correct">
        <p>正解</p>
        {(function(){
          const inputs = [];
          for(let i=0; i<correctCnt; i++){
            inputs.push(<input type="text" key={i} />);
          }
          return inputs;
        })()}
        <PlusMinus handlePlus={handlePlus} handleMinus={handleMinus} />
      </div>
      <div className='Aprediction'>
        <p>A予測</p>
        <PlusMinus handlePlus={handlePlus} handleMinus={handleMinus} />
      </div>
      <div className='Bprediction'>
        <p>B予測</p>
        <PlusMinus handlePlus={handlePlus} handleMinus={handleMinus} />
      </div>
    </>
  )
}

function PlusMinus({ handlePlus, handleMinus }: PlusMinusProps) {
  return (
    <>
      <button onClick={handlePlus}>+</button>
      <button onClick={handleMinus}>-</button>
    </>
  )
}
export default App
