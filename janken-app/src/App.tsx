import { useState } from 'react'
import './App.css'
type JankenProps = {
  hand: string
  setMyHand: React.Dispatch<React.SetStateAction<string>>
  setYourHand: React.Dispatch<React.SetStateAction<string>>
}

type WinnerProps = {
  myHand: string
  yourHand: string
}

const HANDS = ["グー", "チョキ", "パー"];
function judge(me: string, you: string) {
  if (me === you) return "あいこ";
  if (
    (me === "グー" && you === "チョキ") ||
    (me === "チョキ" && you === "パー") ||
    (me === "パー" && you === "グー")
  )
    return "勝ち";
  return "負け";
}

function App() {
  const [myHand, setMyHand] = useState("");
  const [yourHand, setYourHand] = useState("");

  return (
    <>
      <h1>じゃんけん</h1>
      {HANDS.map((hand) => (
        <Janken key={hand} hand={hand} setMyHand={setMyHand} setYourHand={setYourHand} />
      ))}
      {myHand && <p>自分の手 : {myHand}</p>}
      {yourHand && <p>相手の手 : {yourHand}</p>}
      {myHand && yourHand && <Winner myHand={myHand} yourHand={yourHand} />}
    </>
  )
}

function Janken({ hand, setMyHand, setYourHand }: JankenProps) {
  const handleClick = () => {
    setMyHand(hand);
    const randomIndex = Math.floor(Math.random() * HANDS.length);
    setYourHand(HANDS[randomIndex]);
  };
  return <button onClick={handleClick}>{hand}</button>;
}

function Winner({ myHand, yourHand }: WinnerProps) {
  return <p>{judge(myHand, yourHand)}</p>;
}

export default App
