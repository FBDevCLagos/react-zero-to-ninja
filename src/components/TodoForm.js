import React from 'react'
import './todoform.scss'

const TodoForm = props => (
  <form onSubmit={props.handleSubmit} id="todo-form">
    <label htmlFor="title" />
    <input
      id="title"
      name="title"
      value={props.title}
      onChange={props.handleChange}
    />
    <label htmlFor="description" />
    <textarea
      id="description"
      name="description"
      value={props.description}
      onChange={props.handleChange}
    />
    <button>Add Item</button>
  </form>
)

export default TodoForm
