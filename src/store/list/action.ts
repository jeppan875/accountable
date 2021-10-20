import { ActionCreator, Action, Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { requestMockData } from '../..//mockData';

import { ApplicationState } from '../index';
import { ListActionTypes } from './types';

export type AppThunk = ActionCreator<
  ThunkAction<void, ApplicationState, null, Action<string>>
>;

export const fetchList: AppThunk = () => {
  return async (dispatch: Dispatch): Promise<Action> => {
    try {
      dispatch({
        type: ListActionTypes.FETCH_LIST_PENDING,
      });
      const data = await requestMockData();
      return dispatch({
        type: ListActionTypes.FETCH_LIST_SUCCESS,
        payload: data,
      });
    } catch (e) {
      return dispatch({
        type: ListActionTypes.FETCH_LIST_ERROR,
      });
    }
  };
};

export const searchList = (search: string): AnyAction => ({
  type: ListActionTypes.SEARCH_LIST,
  payload: search,
});
