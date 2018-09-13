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
