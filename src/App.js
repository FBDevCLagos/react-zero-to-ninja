import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Todo from './containers/Todo'
import Theme from './containers/context/Theme'

class App extends Component {
  render () {
    return (
      <div id="root-container">
        <h1 id="__welcome-header">Welcome!</h1>
        <hr />
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Todo} />
            <Route path="/context" exact component={Theme} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App
