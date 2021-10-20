import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { createRootReducer } from './store';

export interface ApplicationState {
  list: null;
}

const configureStore = () => {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    createRootReducer(),
    undefined,
    applyMiddleware(...middlewares),
  );

  return store;
};

export const store = configureStore();
