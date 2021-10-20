import { createSelector } from 'reselect';
import { ApplicationState } from '../';
import { ListState, initialState } from './types';

export const listSelector = (state: ApplicationState): ListState =>
  state?.list ? state.list : initialState;

export const topCollectionSelector = createSelector(
  listSelector,
  (list: ListState) => {
    const collections = list?.data?.result || [];
    return collections.map(c => list?.data?.entities?.items[c]);
  },
);
