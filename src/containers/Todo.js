import React, { Component } from 'react'
import TodoList from '../components/TodoList'

class Todo extends Component {
  constructor () {
    super()

    this.state = {
      items: [],
      text: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      items: nextProps.todos
    })
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
      <div>
        <form onSubmit={this.handleSubmit}>
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
