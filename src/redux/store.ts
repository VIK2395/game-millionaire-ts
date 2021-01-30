import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import gameReducer from './gameReducer';

const middleware = [thunk];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(gameReducer, enhancer);

export default store;
