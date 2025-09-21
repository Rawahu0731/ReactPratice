import { useState } from 'react'
import './App.css'
type JankenProps = {
  hand : string
  setMyHand: React.Dispatch<React.SetStateAction<string>>
  setYourHand: React.Dispatch<React.SetStateAction<string>>
}

type WinnerProps = {
  myHand : string
  YourHand : string
}

function App() {
  const [myHand, setMyHand] = useState("")
  const [YourHand, setYourHand] = useState("")

  return (
    <>
      <h1>じゃんけん</h1>
      <Janken hand='グー' setMyHand={setMyHand} setYourHand={setYourHand} />
      <Janken hand='チョキ' setMyHand={setMyHand} setYourHand={setYourHand} />
      <Janken hand='パー' setMyHand={setMyHand} setYourHand={setYourHand} />
      {myHand && <p>自分の手 : {myHand}</p>}
      {YourHand && <p>相手の手 : {YourHand}</p>}
      {myHand && YourHand && <Winner myHand={myHand} YourHand={YourHand} />}
    </>
  )
}

function Janken({hand, setMyHand, setYourHand}:JankenProps) {
  const YourHands:string[]= ["グー", "チョキ", "パー"]

  function handleClick() {
    setMyHand(hand)
    const randomIndex: number = Math.floor(Math.random() * YourHands.length)
    setYourHand(YourHands[randomIndex])
  }
  return(
    <>
      <button onClick={handleClick}>{hand}</button>
    </>
  )
}

function Winner({myHand,YourHand}: WinnerProps) {
  const judge = (me:string,you:string) => {
    if(me == you)return "あいこ"
    if((me == "グー" && you == "チョキ" || me == "チョキ" && you == "パー" || me == "パー" && you == "グー"))return "勝ち"
    return "負け"
  }
  return (
    <p>{judge(myHand,YourHand)}</p>
  )
}

export default App
