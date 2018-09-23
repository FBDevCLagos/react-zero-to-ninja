/*jshint esversion: 6 */

const root = document.querySelector('#root');
const { Component, createElement } = React;

//<============REDUCER====================>
function reducer(state, action) {
    state = state || 0;
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

import { createStore, applyMiddleware } from 'redux';
import { Provider, connect } from 'react-redux';
import thunk from 'redux-thunk';

const storee = createStore(reducer, applyMiddleware(thunk));

//<==============COMPONENTS===========>

class HomeComponent extends Component {
    render() {
        return (
            <Provider store={storee}>
                <ContainerComponent />
            </Provider>
        );
    }
}

class ContainerComponent extends Component {
    render() {
        return createElement(
            'div',
            null,
            createElement(Counter),
            createElement(Apples)
        );
    }
}

class CounterComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement(
            'div',
            null,
            createElement('h3', null, this.props.state),
            createElement(Button, {
                name: 'Increment',
                run: this.props.increment
            }),
            createElement(Button, {
                name: 'Decrement',
                run: this.props.decrement
            }),
            createElement(Button, {
                name: 'Async Increment',
                run: this.props.incrementasync
            }),
            createElement(Button, {
                name: 'Async Decrement',
                run: this.props.decrementasync
            })
        );
    }
}

const Button = function(props) {
    return createElement('button', { onClick: props.run }, props.name);
};

class ApplesComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement(
            'div',
            null,
            createElement('h3', null, `We have ${this.props.state} Apples`),
            createElement(Button, {
                name: 'Add apple',
                run: this.props.increment
            }),
            createElement(Button, {
                name: 'Remove apple',
                run: this.props.decrement
            })
        );
    }
}

//<==============REDUX CONNECTORS===========>
export const Counter = connect(
    function(state, myprops) {
        return { state };
    },
    function(dispatch) {
        return {
            increment: function() {
                dispatch({ type: 'INCREMENT' });
            },
            decrement: function() {
                dispatch({ type: 'DECREMENT' });
            },
            incrementasync: function() {
                storee.dispatch(asynIncrement({ type: 'INCREMENT' }));
            },
            decrementasync: function() {
                storee.dispatch(asynIncrement({ type: 'DECREMENT' }));
            }
        };
    }
)(CounterComponent);

export const Apples = connect(
    function(state, myprops) {
        return { state };
    },
    function(dispatch) {
        return {
            increment: function() {
                dispatch({ type: 'INCREMENT' });
            },
            decrement: function() {
                dispatch({ type: 'DECREMENT' });
            }
        };
    }
)(ApplesComponent);

//<==============ASYNC THUNKS===========>
function asynIncrement(action) {
    return function(dispatch) {
        asyncfetch()
            .then(
                function() {
                    console.log('Dispatching action', action);
                    dispatch(action);
                },
                function() {
                    console.log('Dispatching action', action);
                    dispatch(action);
                }
            )
            .catch(function(e) {
                console.log('Failed call');
            });
    };
}

function asyncfetch() {
    return fetch('https://www.google.com', {
        headers: new Headers({ 'Access-Control-Allow-Origin': '*' })
    });
}

//<==============RENDER APP===========>
ReactDOM.render(createElement(HomeComponent), root);
