import { useState, useEffect, useContext } from "react";
import { useNavigate } from 'react-router-dom';

export default function TodoList() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('my-todos');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('my-todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() === '') return;
    const newTodo = {
      id: Date.now().toString(),
      text: inputValue,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>할 일 목록</h2>
      <div style={{ marginBottom: '10px' }}>
        <input 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>추가</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: '5px' }}>
            {todo.text}
            
            {/* 삭제 버튼 */}
            <button 
              onClick={() => deleteTodo(todo.id)} 
              style={{ margin: 5 }}
            >
              삭제
            </button>

            {/* 상세보기 버튼: 클릭 시 /todolist/id 경로로 이동 */}
            <button 
              onClick={() => navigate("/todolist/" + todo.id)} 
              style={{ margin: 5 }}
            >
              상세보기
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}