import React from 'react'

export default function ToDoElement({ todo, toggleTodos }) {

    function handleToDoClick() {
        toggleTodos(todo.id)
    }

    return (
        <div>
            <label>
                <input type="checkbox" checked={todo.completed} onChange={handleToDoClick}></input>
                {todo.name}
            </label>
        </div>
    )
}
