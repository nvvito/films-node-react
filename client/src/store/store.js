import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { reduser, initialState } from './reduser';

const middleware = [thunk];

const store = createStore(
    reduser,
    initialState,
    applyMiddleware(...middleware),
);

export default store;