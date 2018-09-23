import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { create } from 'handlebars';

const { createElement, Component } = React;

function reducer(state, action) {
    state = state || 0;
    switch (action.type) {
        case 'INCREMENT':
            return state + action.payload;
        case 'DECREMENT':
            return state - action.payload;
        default:
            return state;
    }
}

let store = createStore(reducer);

class Container extends Component {
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }
}

class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return createElement('div', null, createElement(Counter));
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
            createElement('h1', null, `Counter is: ${this.props.state}`),
            createElement(Button, {
                text: 'Increment',
                run: () => {
                    this.props.increment();
                    this.props.messageFunction();
                }
            }),
            createElement(Button, {
                text: 'Decrement',
                run: this.props.decrement
            })
        );
    }
}

const Button = function(props) {
    return <button onClick={props.run}>{props.text}</button>;
};

const Counter = connect(
    mapStateToProps,
    mapDispatchToProps
)(CounterComponent);

function mapStateToProps(state) {
    return { state };
}

function mapDispatchToProps(dispatch) {
    return {
        increment: function() {
            dispatch({ type: 'INCREMENT', payload: 1 });
        },
        decrement: function() {
            dispatch({ type: 'DECREMENT', payload: 1 });
        }
    };
}

const root = document.getElementById('root');
ReactDOM.render(<Container />, root);
