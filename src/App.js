import React, { useState, useRef, useEffect } from "react";
import ToDoElement from "./ToDoElement";
import "./todoStyle.css";
import "./bootstrap/css/bootstrap.min.css";
import { db } from "./firebaseConfiguration";
import {
  collection,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
  addDoc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";

export default function App() {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef();

  const [todosSnapshot] = useCollection(
    query(collection(db, "todos"), orderBy("timestamp", "asc"))
  );

  //receive and changes the id of a checked task
  function toggleTodos(id) {
    const checkedTask = todosSnapshot?.docs.find((task) => task.id === id);
    //Update completed on DB
    const checkedTaskRef = doc(db, "todos", id);
    setDoc(
      checkedTaskRef,
      {
        completed: !checkedTask.data().completed,
      },
      { merge: true }
    );
  }

  //ADD TASK
  function handleAdd(e) {
    const newTask = inputRef.current.value;
    if (newTask === "") return;
    const todosColRef = collection(db, "todos");
    addDoc(todosColRef, {
      name: newTask,
      timestamp: Timestamp.fromDate(new Date()),
      completed: false,
    });
    inputRef.current.value = null; //resets input field
  }

  const [todosCompletedSnapshot] = useCollection(
    query(collection(db, "todos"), where("completed", "==", true))
  );

  //CLEAR COMPLETED
  function handleClear(e) {
    todosCompletedSnapshot.docs.forEach((task) => {
      deleteDoc(doc(db, "todos", task.id));
    });
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
          {todosSnapshot?.docs.map((todoEl) => (
            <ToDoElement
              todo={todoEl}
              key={todoEl.id}
              toggleTodos={toggleTodos}
            />
          ))}
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
            <strong>{todosSnapshot?.docs.filter((todo) => !todo.data().completed).length}</strong>{" "}
            TASKS LEFT TO DO!
          </div>
        </div>
      </div>
    </>
  );
}
