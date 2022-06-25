import { useState, useEffect } from "react";
import InputTodo from "./components/InputTodo";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  const handleClickClearTodos = () => {
    setTodoList(prevTodos => prevTodos.filter(todo => !todo.isCompleted));
  };

  return (
    <>
      <header>
        <h1>TO DO</h1>
      </header>

      <main>
        <div className='Container'>
          <InputTodo setTodoList={setTodoList} />

          {/* TO DO LIST */}
          <div className='TodoList'>
            {todoList.length !== 0 && (
              <TodoList todoList={todoList} setTodoList={setTodoList} />
            )}
          </div>
          {/* END OF TO DO LIST */}

          <button onClick={handleClickClearTodos} className='Clear'>
            clear completed
          </button>
        </div>
      </main>
    </>
  );
}

export default App;
