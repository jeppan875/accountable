import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { ListState } from './store/list/types';

import { createRootReducer } from './store';

export interface ApplicationState {
  list: ListState;
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
