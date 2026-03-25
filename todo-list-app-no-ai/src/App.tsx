import { useState } from 'react'
import './App.css'

type tasksProps = {
  task: string;
  id: number;
  isComplete: boolean;
  isChanging: boolean;
  editString: string;
}

type ListProps = {
  handleTaskClick: (id: number) => void;
  handleChangeClick: (id: number) => void;
  handleSaveClick: (id: number, inputValue: string) => void;
  handleEditStringChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, id: number) => void;
  tasks: tasksProps[];
  isClear: boolean;
}

type TaskItemProps = {
  task: tasksProps;
  handleTaskClick: (id: number) => void;
  isClear: boolean;
  handleEditStringChange: (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, id: number) => void;
  handleSaveClick: (id: number, inputValue: string) => void;
  handleChangeClick: (id: number) => void;
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
        isComplete: false,
        isChanging: false,
        editString: inputValue
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

  const handleChangeClick = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, isChanging: true, editString: task.task } : task
    ))
  }

  const handleSaveClick = (id: number, inputValue: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, task: inputValue, isChanging: false } : task
    ))
  }

  const handleEditStringChange = (e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>, id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, editString: e.target.value } : task
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
        <List handleTaskClick={handleDeleteClick} handleChangeClick={handleChangeClick} handleSaveClick={handleSaveClick} handleEditStringChange={handleEditStringChange} tasks={tasks} isClear={false} />
        <h2>達成済みリスト</h2>
        <List handleTaskClick={handletrueClick} handleChangeClick={handleChangeClick} handleSaveClick={handleSaveClick} handleEditStringChange={handleEditStringChange} tasks={tasks} isClear={true} />
      </div>
    </>
  )
}

function List({ handleTaskClick, handleChangeClick, handleSaveClick, handleEditStringChange, tasks, isClear }: ListProps) {
  return (
    <div style={{ display: "flex" }}>
      <ul>
        {tasks.map((task) => (
          task.isComplete === isClear &&
          <TaskItem key={task.id} task={task} handleTaskClick={handleTaskClick} isClear={isClear} handleEditStringChange={handleEditStringChange} handleSaveClick={handleSaveClick} handleChangeClick={handleChangeClick} />
        ))}
      </ul>
    </div>
  )
}

function TaskItem({task, handleTaskClick, isClear, handleEditStringChange, handleSaveClick, handleChangeClick}:TaskItemProps) {
  return (
    <li>
      <button onClick={() => handleTaskClick(task.id)}>{isClear ? "未達成" : "達成"}</button>
      {task.isChanging === true &&
        <>
          <input type="text" value={task.editString} placeholder={task.task} onChange={(e) => handleEditStringChange(e, task.id)} />
          <button onClick={() => handleSaveClick(task.id, task.editString)}>保存</button>
        </>
      }
      {task.isChanging === false &&
        <>
          {task.task}
          <button onClick={() => handleChangeClick(task.id)}>編集</button>
        </>
      }
    </li>
  )
}
export default App
