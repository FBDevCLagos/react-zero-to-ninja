import React from 'react'
import './todolist.scss'

const TodoList = props => (
  <ul id="todo-list-wrapper">
    {props.items.map(item => (
      <li key={item.id}>
        <div className="todo-item-content">
          <h3>{item.title}</h3>
          {item.description}
        </div>
        <button id="remove-btn" onClick={() => props.removeItem(item)}>X</button>
      </li>
    ))}
  </ul>
)

export default TodoList
