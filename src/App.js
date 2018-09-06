import React, { Component } from 'react'
import Todo from './containers/Todo'

class App extends Component {
  render () {
    return (
      <div id="root-container">
        <h1 id="__welcome-header">Welcome!</h1>
        <hr />
        <Todo />
      </div>
    )
  }
}

export default App
