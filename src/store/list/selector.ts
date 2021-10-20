import { createSelector } from 'reselect';
import { ApplicationState } from '../';
import { ListState, initialState, Item } from './types';

export const listSelector = (state: ApplicationState): ListState =>
  state?.list ? state.list : initialState;

export const collectionSelector = createSelector(
  listSelector,
  (list: ListState) => {
    const searchStr = list.search;
    if (!searchStr) {
      const collections = list?.data?.result || [];
      return collections.map(c => list?.data?.entities?.items[c]);
    } else {
      const allItems: (Item | null)[] = Object.values(
        list?.data?.entities?.items || {},
      );
      const searchResult = allItems.filter(
        i =>
          i?.title?.toLowerCase()?.includes(searchStr) ||
          i?.description?.toLowerCase().includes(searchStr),
      );
      return searchResult;
    }
  },
);
