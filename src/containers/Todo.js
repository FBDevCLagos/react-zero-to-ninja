import React, { Component } from 'react'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import Portal from './portals/Portal'
import './todo.scss'

class Todo extends Component {
  constructor (props) {
    super(props)

    this.state = {
      items: [],
      todo: {
        title: '',
        description: ''
      },
      error: false,
      showPortal: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  handleChange (e) {
    const name = e.target.name
    const todo = this.state.todo
    todo[name] = e.target.value

    this.setState({ todo, error: false })
  }

  handleSubmit (e) {
    e.preventDefault()
    const { title, description } = this.state.todo

    if (title.trim().length === 0 || description.trim().length === 0) {
      this.setState({ error: true })
    } else {
      const newItem = {
        title,
        description,
        id: Date.now()
      }

      this.setState(prevState => ({
        items: [...prevState.items, newItem],
        todo: {
          title: '',
          description: ''
        }
      }))
    }
  }

  removeItem (todo) {
    const todoItems = this.state.items.filter(item => item.id !== todo.id)

    this.setState({ items: todoItems })
  }

  render () {
    const { title, description } = this.state.todo
    return (
      <div id="todo-container-wrappper">
        <TodoForm
          title={title}
          description={description}
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
        />
        {this.state.error && (
          <span className="error"> You cannot enter an empty todo </span>
        )}
        {this.state.items.length > 0 && (
          <TodoList items={this.state.items} removeItem={this.removeItem} />
        )}

        <Portal>
          <h1>I am a Portal</h1>
        </Portal>
      </div>
    )
  }
}

export default Todo
