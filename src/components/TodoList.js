import React from 'react'
import './todolist.scss'

const TodoList = props => (
  <ul id="todo-list-wrapper">
    {props.items.map(item => (
      <li key={item.id}>
        <div>
          <h3>Title: {item.title}</h3>
          <p>
            {' '}
            <strong>Description:</strong> {item.description}{' '}
          </p>
        </div>
        <button onClick={() => props.removeItem(item)}>Remove</button>
      </li>
    ))}
  </ul>
)

export default TodoList
