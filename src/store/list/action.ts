import { ActionCreator, Action, Dispatch, AnyAction } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { requestMockData } from '../..//mockData';

import { ApplicationState } from '../index';
import { ListActionTypes } from './types';
import { ErrorCodes } from '../../Utils/constants';

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
      // throw new Error(ErrorCodes.RETRY);
      // throw new Error(ErrorCodes.FAILURE);
      return dispatch({
        type: ListActionTypes.FETCH_LIST_SUCCESS,
        payload: data,
      });
    } catch (e: any) {
      return dispatch({
        type: ListActionTypes.FETCH_LIST_ERROR,
        payload: e.message,
      });
    }
  };
};

export const searchList = (search: string): AnyAction => ({
  type: ListActionTypes.SEARCH_LIST,
  payload: search,
});

export const updateItem = (
  id: string | undefined,
  title: string,
  description: string,
): AnyAction => ({
  type: ListActionTypes.UPDATE_ITEM,
  payload: {
    id,
    title,
    description,
  },
});

export const removeItem = (id: string | undefined): AnyAction => ({
  type: ListActionTypes.REMOVE_ITEM,
  payload: id,
});
