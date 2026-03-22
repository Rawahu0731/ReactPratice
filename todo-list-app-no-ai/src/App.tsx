import { useState } from 'react'
import './App.css'

type tasksProps = {
  task: string;
  id: number;
  isComplete: boolean;
}

type ListProps = {
  handleClick: (id: number) => void;
  tasks: tasksProps[];
  isClear: boolean;
}

function App() {


  const [tasks, setTasks] = useState<tasksProps[]>([])
  const [inputValue, setInputValue] = useState<string>('')
  const [cnt, setCnt] = useState<number>(0);


  const handleAddClick = () => {
    if (inputValue.trim() != '') {
      const row: tasksProps = {
        task: inputValue,
        id: cnt,
        isComplete: false
      }
      setTasks([...tasks, row])
      setInputValue("");
      setCnt(cnt + 1);
    }
  }

  const handleDeleteClick = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isComplete: true } : task
    ))
  }

  const handletrueClick = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isComplete: false } : task
    ))
  }

  return (
    <>
      <h1>TODOLIST</h1>

      <div className="input-container">
        <input type="text" value={inputValue} placeholder='Add a task' onChange={(e) => setInputValue(e.target.value)} />
        <button onClick={handleAddClick}>Add</button>
      </div>

      <div className="task-list">
        <h2>未達成リスト</h2>
        <List handleClick={handleDeleteClick} tasks={tasks} isClear={false} />
        <h2>達成済みリスト</h2>
        <List handleClick={handletrueClick} tasks={tasks} isClear={true} />
      </div>
    </>
  )
}

function List({ handleClick, tasks, isClear }: ListProps) {
  return (
    <div style={{ display: "flex" }}>
      <ul>
        {tasks.map((task) => (
          task.isComplete === isClear &&
          <li key={task.id}>
            <button onClick={() => handleClick(task.id)}>{isClear ? "未達成" : "達成"}</button>
            {task.task}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
