# react-zero-to-ninja

## Day 3: State management using Redux.

[Redux]('https://redux.js.org/') is a state management architecture that aims to ease the process of state access and updates within an application and it comprises of:

-   Store: These is the top level point where are all application state is stored.
-   Reducers: These are functions that are solely responsible for defining and updating the state.
-   Dispatchers: These are methods whose sole purpose are for alerting the central store that an update should happen.
-   Actions: Discrete discriptors, often structured as JS objects, that carry information about what update should be carried out.

## Redux: Middlewares

[Middlewares]('https://github.com/reduxjs/redux/blob/master/docs/advanced/Middleware.md') are basically functions that recieve a top-level and add functionalities to them.

```js
/* A sample middleware applier */
function applyMiddleWares(store, middlewares) {
    middlewares.forEach(function(middleware) {
        store.dispatch = middleware(store);
    });
}
```

## Thunks

A [Thunk]('https://github.com/reduxjs/redux-thunk') is simply a function that delays the resolution/evaluttin of an expression.

```js
let not_a_thunk = 1 + 2; // Expression is evaluated immediately

function not_a_thunk() {
    return function a_thunk() { // Expression is not evaluated when the parent function is called
        // Execute whatevs
        ...
    }
}
```

[Redux Logger]('https://github.com/evgenyrodionov/redux-logger') is a Redux middleware that provides logging functionality to Redux Stores/implementations.

## Redux vs Context

-   Redux provides out-out-of the box DevTools for state management watches.
-   Redux is a way to `manage` state, Context on the other hand is primarily for `accessing` state values.

And as Abramov has clearly stated in [You might not need Redux]('https://medium.com/@dan_abramov/you-might-not-need-redux-be46360cf367'), all the below are possible with Redux and not with Context:

-   Persist state to a local storage and then boot up from it, out of the box.
-   Pre-fill state on the server, send it to the client in HTML, and boot up from it, out of the box.
-   Serialize user actions and attach them, together with a state snapshot, to automated bug reports, so that the product developers can replay them to reproduce the errors.
-   Pass action objects over the network to implement collaborative environments without dramatic changes to how the code is written.
-   Maintain an undo history or implement optimistic mutations without dramatic changes to how the code is written.
-   Travel between the state history in development, and re-evaluate the current state from the action history when the code changes, a la TDD.
-   Provide full inspection and control capabilities to the development tooling so that product developers can build custom tools for their apps.
-   Provide alternative UIs while reusing most of the business logic.

## Testing: Jest and Enzyme

[Jest]('https://jestjs.io/') is a test runner, which basically means that it used to make assertions about your code and tell you if it works or not the way you expect. [Enzyme]('http://airbnb.io/enzyme/') is a test framework that provdes means for performing specialised tests.

-   Smoke Test: Simple test to ensure your app has started without crashing.
-   Shallow Rendering: A simple test to ensure a component and just the component is rendering fine.
-   Mount (Full Testing): A test to ensure that the component renders with its children and all things work as expected.
