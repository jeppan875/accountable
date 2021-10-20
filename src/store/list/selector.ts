import { createSelector } from 'reselect';
import { ApplicationState } from '../';
import { ListState, initialState, Item } from './types';

export const selectList = (state: ApplicationState): ListState =>
  state?.list ? state.list : initialState;

export const selectItem = createSelector(
  selectList,
  (state: ApplicationState, id: string) => id,
  (list: ListState, id: string) => {
    return list.data?.entities.items[id];
  },
);

export const selectListResult = createSelector(
  selectList,
  (list: ListState) => {
    const searchStr = list.search;
    if (!searchStr) {
      return list?.data?.result || [];
    } else {
      const allItems: Item[] = Object.values(list?.data?.entities?.items);
      const searchResult = allItems.filter(
        i =>
          i?.title?.toLowerCase()?.includes(searchStr) ||
          i?.description?.toLowerCase().includes(searchStr),
      );
      return searchResult.map(r => r.id);
    }
  },
);
