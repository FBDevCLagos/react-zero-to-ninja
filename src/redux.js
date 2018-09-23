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

function createStore(reducer) {
    let state;
    let listeners = [];

    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach(function(listener) {
            listener();
        });
    }

    function getState() {
        return state;
    }

    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {};
    }

    return { dispatch, getState, subscribe };
}

store.subscribe(function() {
    console.log('An event has happened on our store', store.getState());
});
console.log(store.getState());
store.dispatch({ type: 'INCREMENT', payload: 1 });
store.dispatch({ type: 'INCREMENT', payload: 4 });
store.dispatch({ type: 'DECREMENT', payload: 2 });
store.dispatch({ type: 'DECREMENT', payload: 5 });
store.dispatch({ type: 'INCREMENT', payload: 4 });
store.dispatch({ type: 'INCREMENT', payload: 2 });
console.log(store.getState());

// Reducers
// Dispatchers
// Store
// Actions

// THUNKS

function not_a_thunk(a) {
    return function a_thunk(b) {
        return a + b;
    };
}

console.log(not_a_thunk(4)(8));

function ninja(store) {
    let next = store.dispatch;

    store.dispatch = function() {
        console.log('Ninja stuff', store.getState());
        let r = next();
        return r;
    };
}

function pikin(store) {}

function applyMiddlewares(arr) {}
