import { combineReducers } from 'redux';

import { listReducer } from './list/reducer';

export interface ApplicationState {
  list: null;
}

export const createRootReducer = () =>
  combineReducers({
    list: listReducer,
  });
