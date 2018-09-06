import React, { Component } from 'react'
import Todo from './containers/Todo'

class App extends Component {
  constructor () {
    super()

    this.state = {
      todos: []
    }
  }

  componentDidMount () {
    setTimeout(() => {
      this.setState({
        todos: [
          {
            id: '123',
            text: 'Eating'
          },
          {
            id: 'yeyeye',
            text: 'Jumping'
          }
        ]
      })
    }, 3000)
  }

  render () {
    return (
      <div id="root-container">
        <h1 id="__welcome-header">Welcome!</h1>
        <hr />
        <Todo todos={this.state.todos} />
      </div>
    )
  }
}

export default App
