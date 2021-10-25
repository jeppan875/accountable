import { mockData } from '../../mockData';
import { listReducer, normalizedScheme } from './reducer';
import { initialState, ListActionTypes } from './types';
import { normalize, schema } from 'normalizr';

const normalizedData = normalize(mockData, normalizedScheme);

test('should return the initial state', () => {
  expect(listReducer(undefined, { type: '' })).toEqual(initialState);
});

test('should normalize fetched data', () => {
  expect(
    listReducer(
      {
        data: undefined,
        error: undefined,
        loading: true,
        search: '',
      },
      {
        type: ListActionTypes.FETCH_LIST_SUCCESS,
        payload: mockData,
      },
    ),
  ).toEqual({
    data: normalizedData,
    error: undefined,
    loading: false,
    search: '',
  });
});
