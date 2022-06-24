import { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [todoList, setTodoList] = useState([]);

  const inputTodo = useRef();

  const handleSubmitTodoList = event => {
    event.preventDefault();
    const inputText = inputTodo.current.value;
    const todoObject = {
      id: +new Date(),
      text: inputText,
      isCompleted: false,
      isEditing: false,
    };
    setTodoList(prev => [...prev, todoObject]);
    inputTodo.current.value = "";
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList]);

  return (
    <>
      <header>
        <h1>TODO</h1>
      </header>

      <main>
        <div className='Container'>
          <div className='InputForm'>
            <form onSubmit={handleSubmitTodoList}>
              <div className='InputGroup'>
                <label htmlFor='input-todo'>Input</label>
                <input type='text' id='input-todo' ref={inputTodo} />
              </div>
              <button></button>
            </form>
          </div>

          <div className='TodoList'>
            {todoList.length !== 0 && (
              <>
                {todoList.map(todo => (
                  <div className='Todo' key={todo.id}>
                    <div className='Right'>
                      <input type='checkbox' />
                      <div className='Text'>{todo.text}</div>
                    </div>

                    <div className='Left'>
                      <button>edit</button>
                      <button>remove</button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
