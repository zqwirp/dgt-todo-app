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

  const handleOnChangeCheckTodo = (event, id) => {
    setTodoList(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isCompleted: event.target.checked,
          };
        }
        return todo;
      })
    );
  };

  const handleClickRemoveTodo = id => {
    setTodoList(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const handleClickEditTodo = id => {
    setTodoList(prevTodos =>
      prevTodos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            isEditing: !todo.isEditing,
          };
        }
        return todo;
      })
    );
  };

  const handleChangeTodo = (id, event) => {
    if (event.key === "Enter") {
      setTodoList(prevTodos =>
        prevTodos.map(todo => {
          if (todo.id === id) {
            return {
              ...todo,
              text: event.target.value,
              isEditing: !todo.isEditing,
            };
          }
          return todo;
        })
      );
    }
  };

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
          {/* INPUT TO DO */}
          <div className='InputForm'>
            <form onSubmit={handleSubmitTodoList}>
              <div className='InputGroup'>
                <label htmlFor='input-todo'>Input</label>
                <input
                  type='text'
                  id='input-todo'
                  ref={inputTodo}
                  maxLength='50'
                />
              </div>
              <button></button>
            </form>
          </div>
          {/* END OF INPUT TO DO */}

          {/* TO DO LIST */}
          <div className='TodoList'>
            {todoList.length !== 0 && (
              <>
                {todoList.map(todo => (
                  <div className='Todo' key={todo.id}>
                    {todo.isEditing ? (
                      <div className='Editing'>
                        <input
                          type='text'
                          onKeyUp={event => {
                            handleChangeTodo(todo.id, event);
                          }}
                        />
                        <button onClick={() => handleClickEditTodo(todo.id)}>
                          cancel
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className='Right'>
                          <input
                            type='checkbox'
                            onChange={event =>
                              handleOnChangeCheckTodo(event, todo.id)
                            }
                          />
                          <div
                            className={`Text ${todo.isCompleted && "Checked"}`}
                          >
                            {todo.text}
                          </div>
                        </div>

                        <div className='Left'>
                          <button
                            className={`${todo.isCompleted && "Disabled"}`}
                            onClick={() => handleClickEditTodo(todo.id)}
                            disabled={todo.isCompleted}
                          >
                            edit
                          </button>
                          <button
                            onClick={() => handleClickRemoveTodo(todo.id)}
                          >
                            remove
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </>
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
