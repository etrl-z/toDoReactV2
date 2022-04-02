import React, { useState, useRef, useEffect } from "react";
import TodoList from "./TodoList";
import { v4 as uuidv4 } from "uuid";
import "./todoStyle.css";
import "./bootstrap/css/bootstrap.min.css";

const LOCAL_STORAGE_ID = "localstorageKey";

export default function App() {
  //collection + function which updates collection = state(default empty)
  const [todos, setTodos] = useState([]);
  //reference html elements
  const inputRef = useRef();

  //load list from local storage when the app opens (the empty array of parameters never triggers the function again)
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_ID));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  //save items when state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(todos));
  }, [todos]);

  //receive the id of a checked task and updates list
  function toggleTodos(id) {
    const updatedTodos = [...todos];
    const checkedTask = updatedTodos.find((task) => task.id === id);
    checkedTask.completed = !checkedTask.completed;
    setTodos(updatedTodos);
  }

  //replace previous list with the populated one
  function handleAdd(e) {
    const newTask = inputRef.current.value; //read input field value
    if (newTask === "") return;
    setTodos((taskList) => {
      return [...taskList, { id: uuidv4(), name: newTask, completed: false }];
    });
    inputRef.current.value = null; //resets input field
  }

  //replace previous list with the cleared one
  function handleClear(e) {
    const clearedList = todos.filter((todo) => !todo.completed);
    setTodos(clearedList);
  }

  //call add function when Enter is pressed
  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        event.preventDefault();
        handleAdd();
      }
    };
    document.addEventListener("keydown", listener); //when component is loaded
    return () => {
      document.removeEventListener("keydown", listener); //destroys the component
    };
  });

  return (
    <>
      <div class="container-box">
        <div class="list">
          <TodoList list={todos} toggleTodos={toggleTodos} />
        </div>
        <input
          class="row1 input"
          ref={inputRef}
          type="text"
          placeholder="Add your next Task..."
        />
        <div class="row2">
          <p class="button button-add" onClick={handleAdd}>
            ADD TASK
          </p>
          <p class="button button-clear" onClick={handleClear}>
            CLEAR DONE
          </p>
        </div>
        <div class="row3">
          <div class="text-bottom">
            YOU HAVE{" "}
            <strong>{todos.filter((todo) => !todo.completed).length}</strong>{" "}
            TASKS LEFT TO DO!
          </div>
        </div>
      </div>
    </>
  );
}
