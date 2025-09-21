import { useState } from 'react'
import './App.css'

type inputProps = {
  setTodoList : React.Dispatch<React.SetStateAction<Todo[]>>
}
type listProps = {
  todoList : Todo[]
  selectedIds : Set<string>
  onToggle : (id: string) => void
}
type Todo = {
  id : string
  text : string
}
type DeleteButtonProps = {
  onClick : () => void
  disabled?: boolean
}

function App() {
  const [todoList, setTodoList] = useState<Todo[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const deleteSelected = () => {
    setTodoList(prev => prev.filter(t => !selectedIds.has(t.id)))
    setSelectedIds(new Set())
  }
  
  return (
    <>
      <h1>TODOリスト</h1>
      <Input setTodoList={setTodoList} />
      <DeleteButton onClick={deleteSelected}/>
      <List todoList={todoList} selectedIds={selectedIds} onToggle={toggleSelect}/>
    </>
  )
}

function Input({setTodoList}: inputProps){
  const [val, setVal] = useState("")

  const addTodo = () => {
    const text = val.trim()
    if (!text) return
    const id = crypto.randomUUID?.() ?? String(Date.now())
    setTodoList(prev => [...prev, { id, text }])
    setVal("")
  }

  return (
    <>
      <input value={val} onChange={(e) => setVal(e.target.value)}></input>
      <button onClick={addTodo}>保存</button>
    </>
  )
}

function List({todoList, selectedIds, onToggle}: listProps) {
  return (
     <ul>
       {todoList.map((todo) => {
        const id = `check-${todo.id}`
        return (
          <>
          <li key={todo.id}>
            <input
              type='checkbox'
              id={id}
              checked={selectedIds.has(todo.id)}
              onChange={() => onToggle(todo.id)}
              />
            <label htmlFor={id}>{todo.text}</label>
          </li>
          </>
        )
      })}
    </ul>
  )
}

function DeleteButton({onClick, disabled}: DeleteButtonProps){
  return (
    <button type='button' onClick={onClick} disabled={disabled}>削除</button>
  )
}

export default App
