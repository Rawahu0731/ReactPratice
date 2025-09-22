import { useState } from 'react'
import './App.css'

type StartProps = {
  setNum: React.Dispatch<React.SetStateAction<number>>
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}
type GameProps = {
  answer: number
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
}

function App() {
  const [answer, setAnswer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <>
      <h1>数字あてゲーム</h1>
      {!isPlaying && <Start setNum={setAnswer} setIsPlaying={setIsPlaying} />}
      {isPlaying && <Game answer={answer} setIsPlaying={setIsPlaying} />}
    </>
  )
}

function Start({setNum, setIsPlaying}: StartProps){
  const handleClick = () => {
    setNum(Math.floor(Math.random() * 100 + 1));
    setIsPlaying(true);
  }
  return <button onClick={handleClick}>スタート</button>
}

function Game({answer, setIsPlaying}: GameProps){
  const [value, setValue]= useState(0)
  const [text, setText] = useState("")
  const [isFinished, setIsFinished] = useState(false)
  const handleClick = () => {
    if(value === answer) {
      setText("正解！")
      setValue(0)
      setIsFinished(true)
    }else if(value < answer) {
      setText("もっと大きいよ")
      setValue(0)
    }else {
      setText("もっと小さいよ")
      setValue(0)
    }
  }
  return (
    <>
      <p>{answer}</p>
      <input type='number' value={value} onChange={(e) => setValue(Number(e.target.value))}/>
      <button onClick={handleClick}>予想する</button>
      <p>{text}</p>
      {isFinished && <button onClick={() => setIsPlaying(false)}>もう一度遊ぶ</button>}
    </>
  )
}
export default App
