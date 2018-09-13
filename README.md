# react-zero-to-ninja

## Complete Intro to React

*Day 2: DOM events and state management*
- Forms with React
- Lifting state up
- Context
- Portals


### Forms

HTML form elements work a little bit differently from other DOM elements in React because form elements naturally keep some internal state.
Form has the default HTML form behavior of browsing to a new page when the user submits the form. However, it is convenient to have a JavaScript function that handles submission and also has access to the data the user submitted.
The standard way to acvhieve this is, is using a technique called *Controlled Components*

- Controlled Component: Is a component that takes its current value through `props` and notifies changes through callbacks like `onChange`. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component"

 Example: 

```jsx
import React, {Component} from 'react'

class TodoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      todos: []
      };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({text: event.target.value})
  }

  handleSubmit (e) {
    e.preventDefault()

    if (this.state.text.trim().length === 0) {
      this.setState({ error: true })
    } else {
      const newItem = {
        title: this.state.text,
        id: Date.now()
      }

      this.setState(prevState => ({
        todos: [...prevState.todos, newItem],
        text: ''
      }))
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Todo:
          <input type="text" value={this.state.text} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

- Uncontrolled Component: Is the components that stores its own state internally, and you can query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.


Example:

```jsx
import React, {Component} from 'react'

class TodoForm extends React.Component {
  constructor(props) {
    super(props)

    this.input = React.createRef()
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(event) {
    event.preventDefault()
    
    alert('A todo was submitted: ' + this.input.current.value)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Todo:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```


### Lifting state up

To shared a state between two components, the most common operation is to move it up to their closest common ancestor is called "lifting state up"
There should be a single "source of truth" for any data that changes in a React application.

Lets add the `TodoList` component that displays the our todos


Say for instance we added a `deleteTodo` handler to a `TodoForm` class Component and then import it into our component

```jsx
import React, { Component } from 'react'
import TodoList from '../components/TodoList'
```

```jsx
  deleteTodo (todo) {
    const todoItems = this.state.todos.filter(item => item.id !== todo.id)

    this.setState({ todos: todoItems })
  }
```

our `TodoList` should look like this

```jsx
import React from 'react'

const TodoList = props => (
  <ul id="todo-list-wrapper">
    {props.todos.map(todo => (
      <li key={todo.id}>
        <span>{todo.title}</span>
        <button onClick={() => props.removeItem(todo)}>Remove</button>
      </li>
    ))}
  </ul>
)

export default TodoList
```

And we go ahead to pass the handler down as a prop to the `TodoList` in the class component

```jsx
<TodoList todos={this.state.todos} deleteTodo={this.deleteTodo} />
```

In simple terms, lifting state up basically is passing down data in state down as props from the parent component to the child component

### Context

Context provides a way to pass data through the component tree without having to pass props down manually at every level.

- When to use Context
Context is designed to share data that can be considered 'global' for a tree of React component such as the current authenticated user, theme or preferred language.

For example 

```jsx
import React, { Component } from 'react'

// Context lets us pass a value deep into the component tree
// without explicitly threading it through every component.
// Create a context for the current theme (with "orange" as the default).
const ThemeContext = React.createContext('orange')

class Theme extends Component {
  render () {
    // Use a Provider to pass the current theme to the tree below.
    // Any component can read it, no matter how deep it is.
    // In this example, we're passing "green" as the current value.
    return (
      <ThemeContext.Provider value="green">
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// A component in the middle doesn't have to
// pass the theme down explicitly anymore.
function Toolbar (props) {
  return (
    <div>
      <ThemedButton />
    </div>
  )
}

function ThemedButton (props) {
  // Use a Consumer to read the current theme context.
  // React will find the closest theme Provider above and use its value.
  // In this example, the current theme is "dark".
  return (
    <ThemeContext.Consumer>
      {theme => {
        return (
          <button {...props} style={{ backgroundColor: theme }}>
            The Context Button
          </button>
        )
      }}
    </ThemeContext.Consumer>
  )
}

export default Theme
```

Note: Context is primarily used when some data needs to be accessible by many components at different nesting levels. Apply it sparingly because it makes component reuse more difficult.


### Portals
Portals provide a first-class way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

- Usage: Normally, when an element is returned from a component's render method, it's mounted into the DOM as a child of the nearest parent node:

```jsx
render() {
  // React mounts a new div and renders the children into it
  return (
    <div>
      {this.props.children}
    </div>
  )
}
```
However, sometimes it's useful to insert a child into a different location in the DOM:

```jsx
render() {
  // React does *not* create a new div. It renders the children into `domNode`.
  // `domNode` is any valid DOM node, regardless of its location in the DOM.
  return ReactDOM.createPortal(
    this.props.children,
    domNode
  )
}
```

Example: 

Let's go ahead to create another `div` in our `src/index.html` file where our portal would be mounted

```
<div id="portal"></div>
```

Then let's create our `Portal` component, this would be a reusable portal

```jsx
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const portalRoot = document.getElementById('portal')

export default class Portal extends Component {
  constructor () {
    super()
    this.el = document.createElement('div')
  }

  componentDidMount () {
    portalRoot.appendChild(this.el)
  }

  componentWillUnmount () {
    portalRoot.removeChild(this.el)
  }

  render () {
    const { children } = this.props
    return ReactDOM.createPortal(children, this.el)
  }
}
```

We can go ahead to use it any where in our application by wrapping `<Portal>` around the content we want to display in the `<div id="portal"></div>` div
Sample usage:

```jsx
<Portal>
  <h1>I am a Portal</h1>
</Portal>
```

Note: This would still work and be displayed appropriately like any other component in the application and also take the context from where it is called, the only different is that it would be rendered in the `<div id="portal"></div>` which is outside our root `div`
