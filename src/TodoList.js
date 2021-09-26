import React from "react";
import ToDoElement from './ToDoElement'

export default function TodoList({ list, toggleTodos }) {
    return (
        list.map(todoEl => {
            return <ToDoElement todo={todoEl} key={todoEl.id} toggleTodos={toggleTodos} />
        })
    )
}
