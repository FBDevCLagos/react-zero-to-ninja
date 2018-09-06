import React, { Component } from 'react'
import TodoList from '../components/TodoList'
import './todo.scss';

class Todo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: props.todos,
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.todos.length !== prevState.items.length) {
      return { items: nextProps.todos }
    }

    return null
  }

  handleChange (e) {
    this.setState({ text: e.target.value })
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this.state.text.length === 0) {
      return alert('Please fill in the input field')
    }

    const newItem = {
      text: this.state.text,
      id: Date.now()
    }

    this.setState(prevState => ({
      items: [...prevState.items, newItem],
      text: ''
    }))
  }

  removeItem (todo) {
    const todoItems = this.state.items.filter(item => item.id !== todo.id)

    this.setState({ items: todoItems })
  }

  render () {
    return (
      <div id="todo-container-wrappper">
        <form onSubmit={this.handleSubmit} id="todo-form">
          <label htmlFor="todo" />
          <input
            id="todo"
            name="todo"
            value={this.state.text}
            onChange={this.handleChange}
          />
          <button>Add Item</button>
        </form>

        {this.state.items.length > 0 && (
          <TodoList items={this.state.items} removeItem={this.removeItem} />
        )}
      </div>
    )
  }
}

export default Todo
