import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducer";
// persist store code
export  const loadState = () => {
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

// This persistedState is includedat the time of store creation as initial value
const store = createStore(reducers, persistedState,applyMiddleware(thunk));

// This is actually call every time when store saved
store.subscribe(() => {
  saveState(store.getState());
});

export default store;