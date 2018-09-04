import React, { Component } from 'react'
import Todo from './containers/Todo'

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>Welcome!</h1>
        <Todo />
      </div>
    )
  }
}

export default App
