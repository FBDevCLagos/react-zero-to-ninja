# react-zero-to-ninja

## Complete Intro to React

*Day 1: Introduction and setup*
- Pure React
- NPM, Prettier, ESLint
- Parcel (bundling)
- Functional and Class components
- State and Lifecycle Methods with React
- Handling Events with Async UIs with React


### Introduction

- React is a JavaScript library for building user interfaces
- React is an open source project created by Facebook
- One of the most important aspect of React is the fact that you can create components which are like custom resuable HTML elements to quickly and efficiently build user interfaces.


### Prerequisites

- NPM (Node Package Manager)
I am currently using [Node](https://nodejs.org/en/) v6.9.4. If you need to use a different version of Node for work, I strongly recommend using [NVM](https://github.com/creationix/nvm).


### Tooling

- [NPM](https://www.npmjs.com/) - Is a package mananger for JavaScript and the world's largest software registery, open source developers from every continent use NPM to share and borrow packages, and many organization use NPM to manage private development. Basically it is a way to reuse, share and manage code.

- [Prettier](https://github.com/prettier/prettier) - Is an amazing tool that enforces a consistent style by parsing code and reprinting it with its own rules. So you don't have to constantly worry about the style of the code: where to stick indents, when to break lines etc.
When building this application we would be using Prettier to automatically format our JavaScript code, husky and lint-staged to add a precommit script that runs Prettier and the tests when we commit.

- [ESLint](https://www.npmjs.com/package/eslint) - Is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code. On top of Prettier which takes care of code formatting, we would like to enforce some code style.

- [Parcel](https://www.npmjs.com/package/parcel) - We would be using Parcel here for our bundling, which helps us to put all our JavaScript code and all it's dependences in one file. Parcel is designed to need zero configuration, it is light weight and all you need to do is just to point it to the entry point of your application.


### Setting up the application 

- `npm init`, this creates a package.json file
- let go ahead to install the packages we need to setup our application `npm install react react-dom parcel --save`
- create a `src` folder that contains all our project files
- now in the `src/index.js` file

```
import React from 'react'
import ReactDOM from 'react-dom'
```

- lets create our `src/App.js` component which would be our root component

```
import React, { Component } from 'react'

class App extends Component {
  render () {
    return (
      <div>
        <h1> Hello </h1>
      </div>
    )
  }
}

export default App
```

- In our `src/index.js`. import `App.js`, making our entry file look like this

```
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
```

- Finally, we would render the `App` component to the root in the same file

```
ReactDOM.render(<App />, document.getElementById('root'))
```

- Now that we have our `src/index.js`, we need to create an `index.html` file.
- Let’s start by making a basic `src/index.html` file. We’re also going to make a `div` with an id called `root`, and finally we’ll create a `script tag` where your custom code will live.

```
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
  </head>
  <body>
    <div id="root"></div>
    <script src="./index.js"></script> 
  </body>
</html>
```

- We can go ahead to add the `start` script to our `package.json`

```
"start": "parcel src/index.html --open"
```

- Then run `npm start` this would open a new tab that runs on `http://localhost:1234`

Yaay! we have our react app. We can now dive into more concepts of React


### Functional and Class components

**What are components?**

Components are self-sustaining, independent micro-entities that describe a part of your UI. An application's UI can be split up into smaller components where each component has its own code, structure and API.

A React component can be of two types: *a class component* or *a functional component*. The difference between the two is evident from their names.

The simplest way to define a component in React is to write a JavaScript function. Below will just return a function which accepts props and returns a React element. 

```jsx
const Welcome = props => (<h1>Hello, {props.name}</h1>)
```

A class based component is a JavaScript class. It extends `React.Component`, and its only required method is `render()`. But this component has some neat super powers underneath the surface 

- Lifecycle hooks
- Internal state
- Performace increase: Another great aspect of class-based components is that you can decide whether or not they should update.

Here's an example of one of those:

```jsx
class Welcome extends React.Component {
  render () {
    return <h1>Hello, {this.props.name}</h1>
  }
}
```

Both versions will give you the same exact output. Now you might ask yourself: *When should I use a function and when a class?*

You can use either a function or a class for creating stateless components, unless you need to use a lifecycle hook in your components, you should go for stateless functional components. There are a lot of benefits if you decide to use stateless functional components here; they are easy to write, understand, and test, and you can avoid the `this` keyword altogether.

Some practices, I would like if we can create two folders:

- **containers**: this is where all our class components would go
- **components**: this is where our functional components would go

Let go ahead to create `TodoList` component in `components` folder, this would be a functional component that takes in props and returns output

```jsx
import React from 'react'

const TodoList = props => (
  <ul>
    {props.items.map(item => (
      <div key={item.id}>
        <li>{item.text}</li>
        <button onClick={() => props.removeItem(item)}>
          Remove {item.text}
        </button>
      </div>
    ))}
  </ul>
)

export default TodoList
```

The `TodoList` would be imported into the `Todo` container component where the props would be passed down to it

```jsx
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
        {this.state.items.length && (
          <TodoList items={this.state.items} removeItem={this.removeItem} />
        )}
      </div>
    )
  }
}

export default Todo
```

Then in our `App.js` file we can have import the `Todo.js` so that this can reflect in our browser

```jsx
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
```

The browser would now be aware of this and would display it.
