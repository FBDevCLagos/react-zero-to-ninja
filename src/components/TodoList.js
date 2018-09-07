import React from 'react'
import './todolist.scss'

const TodoList = props => (
  <ul id="todo-list-wrapper">
    {props.items.map(item => (
      <li key={item.id}>
        <span>{item.title}</span>
        <button onClick={() => props.removeItem(item)}>Remove</button>
      </li>
    ))}
  </ul>
)

export default TodoList
