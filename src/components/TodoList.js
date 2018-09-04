import React from 'react'

const listStyle = {
  display: 'flex',
  width: '200px',
  marginBottom: '5px',
  justifyContent: 'space-between'
}

const TodoList = props => (
  <ul>
    {props.items.map(item => (
      <div key={item.id} style={listStyle}>
        <li>{item.text}</li>
        <button onClick={() => props.removeItem(item)}>
          Remove {item.text}
        </button>
      </div>
    ))}
  </ul>
)

export default TodoList
