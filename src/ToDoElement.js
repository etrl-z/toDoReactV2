import React from 'react';
import './todoStyle.css';

export default function ToDoElement({ todo, toggleTodos }) {

    function handleToDoClick() {
        toggleTodos(todo.id)
    }

    return (
        <div class="list-item">
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" checked={todo.completed} onChange={handleToDoClick}></input>
                <label class="form-check-label" for="flexCheckDefault">
                    {todo.name}
                </label>
            </div>
        </div>
    )
}
