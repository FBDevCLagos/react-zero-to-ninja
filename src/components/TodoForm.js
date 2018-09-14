import React from 'react'
import './todoform.scss'

const TodoForm = props => (
  <form onSubmit={props.handleSubmit} id="todo-form">
    <div className="form-input-group">
      <label htmlFor="title">Title</label>
      <input
        id="title"
        name="title"
        value={props.title}
        placeholder="Title"
        onChange={props.handleChange}
      />
    </div>
    <div className="form-input-group">
      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        value={props.description}
        onChange={props.handleChange}
      />
    </div>

    <button id="add-btn">Add Item</button>
  </form>
)

export default TodoForm
