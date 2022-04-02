import React from "react";
import "./todoStyle.css";

export default function ToDoElement({ todo, toggleTodos }) {
  function handleToDoClick() {
    toggleTodos(todo.id);
  }

  return (
    <div class="list-item" onClick={handleToDoClick}>
      {!todo.data().completed ? (
        <>
          <div class="grey"></div>
          <label>{todo.data().name}</label>
        </>
      ) : (
        <>
          <div class="green"></div>
          <label>
            <s>{todo.data().name}</s>
          </label>
        </>
      )}
    </div>
  );
}
