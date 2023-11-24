// store/store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // Use if asynchronous actions are needed
import rootReducer from './reducers/rootReducer'; // Create this file later

const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if(serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };
  
  const saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

  const persistedState = loadState();

const store = createStore(rootReducer, persistedState, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
    saveState(store.getState());
  });

export default store;
