// store/store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // Use if asynchronous actions are needed
import rootReducer from './reducers/rootReducer'; // Create this file later


const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
