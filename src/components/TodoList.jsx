function TodoList({ todoList, setTodoList }) {
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

  return (
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
                  onChange={event => handleOnChangeCheckTodo(event, todo.id)}
                />
                <div className={`Text ${todo.isCompleted && "Checked"}`}>
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
                <button onClick={() => handleClickRemoveTodo(todo.id)}>
                  remove
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </>
  );
}

export default TodoList;
