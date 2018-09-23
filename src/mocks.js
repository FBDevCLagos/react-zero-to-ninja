import { reducer } from './index';

//<==================Store======================>
export const createStore = function(reducer) {
    let state;
    let listeners = [];

    /* Returns our current state */
    const getState = function() {
        return state;
    };

    /* Responsible for all changes to our state */
    const dispatch = function(action) {
        state = reducer(state, action);
    };

    /* a function that tells us that something has happened on  */
    const subsribe = function(listener) {
        listener();
        return function() {
            listeners.filter(function(li) {
                return li !== listener;
            });
        };
    };

    dispatch({});
    return { getState, dispatch, subsribe };
};

/** A simple Thunk */
const thunk = function() {
    return function() {};
};

/** A mock logger */
const logger = function(store) {
    return function(next) {
        return function(action) {
            // console.log(action);
            const r = next(action);
            return r;
        };
    };
};

/* A sample middleware applier */
function applyMiddleWares(store, middlewares) {
    middlewares.forEach(function(middleware) {
        store.dispatch = middleware(store);
    });
}

const store = createStore(reducer);

applyMiddleWares(store, [logger]);

const unsubsribe = store.subsribe(function() {
    console.log('state has changed');
});
