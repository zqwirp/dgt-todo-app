import { useRef } from "react";

function InputTodo({ setTodoList }) {
  const inputTodo = useRef();

  const handleSubmit = event => {
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

  return (
    <div className='InputForm'>
      <form onSubmit={handleSubmit}>
        <div className='InputGroup'>
          <label htmlFor='input-todo'>Input</label>
          <input type='text' id='input-todo' ref={inputTodo} maxLength='50' />
        </div>
        <button></button>
      </form>
    </div>
  );
}

export default InputTodo;
