import { combineReducers } from 'redux';

import { listReducer } from './list/reducer';

// The top-level state object
export interface ApplicationState {
  list: null;
}

export const createRootReducer = () =>
  combineReducers({
    list: listReducer,
  });
