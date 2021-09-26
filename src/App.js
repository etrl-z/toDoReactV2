import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from 'uuid';

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

  return (
    <>
      <TodoList list={todos} toggleTodos = {toggleTodos} />
      <input ref={nameRef} type="text" />
      <button onClick={handleAdd}>ADD</button>
      <button onClick={handleClear}>CLEAR DONE</button>
      <div>{todos.filter(todo => !todo.completed).length} left To Do</div>
    </>
  )
}
