import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';
import './todoStyle.css';
import './bootstrap/css/bootstrap.min.css';

const LOCAL_STORAGE_ID = "todoApp.todos"

export default function App() {

  const [todos, setTodos] = useState([]);
  const nameRef = useRef();

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID))
    if (storedTodos) setTodos(storedTodos)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(todos));
  }, [todos])

  function toggleTodos(id) {
    const newTodos = [...todos]
    const task = newTodos.find(task => task.id === id)
    task.completed = !task.completed
    setTodos(newTodos)
  }

  function handleAdd(e) {
    const name = nameRef.current.value;
    if (name === "") return
    setTodos(previous => {
      return [...previous, { id: uuidv4(), name: name, completed: false }]
    })
    nameRef.current.value = null;
  }

  function handleClear(e) {
    const clearedList = todos.filter(todo => !todo.completed)
    setTodos(clearedList)
  }

  // document.addEventListener("keyup", function (event) {
  //   if (event.code === "Enter") return
  //     handleAdd();
  // });

  return (
    <>
      <div class="container-box">
        <div class="list">
          <TodoList list={todos} toggleTodos={toggleTodos} />
        </div>
        <input class="row1 input" ref={nameRef} type="text" placeholder="Add your next Task..." />
        <div class="row2">
          <div class="button button-add" onClick={handleAdd}>
            <div class="button-text">ADD TASK</div>
          </div>
          <div class="button button-clear" onClick={handleClear}>
            <div class="button-text">CLEAR DONE</div>
          </div>
        </div>
        <div class="row3">
          <div class="text-bottom">YOU HAVE <strong>{todos.filter(todo => !todo.completed).length}</strong> TASKS LEFT TO DO!</div>
        </div>
      </div>

    </>
  )
}
