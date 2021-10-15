import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { createRootReducer } from './store';

export interface ApplicationState {
  list: null;
}

export default function configureStore() {
  const middlewares = [thunkMiddleware];

  const store = createStore(
    createRootReducer(),
    undefined,
    applyMiddleware(...middlewares),
  );

  return store;
}
