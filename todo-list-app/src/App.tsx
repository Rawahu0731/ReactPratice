import { useState } from 'react'
import './App.css'

type InputProps = {
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
};
type ListProps = {
  todoList: Todo[];
  selectedIds: Set<string>;
  onToggle: (id: string) => void;
};
type Todo = {
  id: string;
  text: string;
};
type DeleteButtonProps = {
  onClick: () => void;
  disabled?: boolean;
};

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
  <DeleteButton onClick={deleteSelected} disabled={selectedIds.size === 0} />
  <List todoList={todoList} selectedIds={selectedIds} onToggle={toggleSelect} />
    </>
  )
}

function Input({ setTodoList }: InputProps) {
  const [value, setValue] = useState("");

  const handleAdd = () => {
    const text = value.trim();
    if (!text) return;
    const id = crypto.randomUUID?.() ?? String(Date.now());
    setTodoList(prev => [...prev, { id, text }]);
    setValue("");
  };

  return (
    <>
      <input value={value} onChange={e => setValue(e.target.value)} />
      <button onClick={handleAdd}>保存</button>
    </>
  );
}

function List({ todoList, selectedIds, onToggle }: ListProps) {
  return (
    <ul>
      {todoList.map(todo => {
        const id = `check-${todo.id}`;
        return (
          <li key={todo.id}>
            <input
              type="checkbox"
              id={id}
              checked={selectedIds.has(todo.id)}
              onChange={() => onToggle(todo.id)}
            />
            <label htmlFor={id}>{todo.text}</label>
          </li>
        );
      })}
    </ul>
  );
}

function DeleteButton({ onClick, disabled }: DeleteButtonProps) {
  return (
    <button type="button" onClick={onClick} disabled={disabled}>
      削除
    </button>
  );
}

export default App
