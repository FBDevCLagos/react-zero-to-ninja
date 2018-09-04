import React, { Component } from 'react'
import Name from './containers/Name'
import Data from './components/Data'

class App extends Component {
  render () {
    return (
      <div className="App">
        <h1>Hello, React!</h1>
        <Name firstName="Simi" />
        <Data />
      </div>
    )
  }
}

export default App
