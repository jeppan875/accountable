import { createSelector } from 'reselect';
import { ApplicationState } from '../';
import { ListState, initialState, Item } from './types';

export const selectList = (state: ApplicationState): ListState =>
  state?.list ? state.list : initialState;

export const selectItem = createSelector(
  selectList,
  (state: ApplicationState, id: string | undefined) => id,
  (list: ListState, id: string | undefined) => {
    if (id == null) return null;
    return list.data?.entities.items[id];
  },
);

export const selectListResult = createSelector(
  selectList,
  (list: ListState) => {
    const searchStr = list.search.toLowerCase().trim();
    if (!searchStr) {
      return list?.data?.result || [];
    } else {
      const allItems: Item[] = Object.values(list?.data?.entities?.items);
      const searchResult = allItems.filter(item => {
        const title = item?.title?.toLowerCase();
        const description = item?.description.toLowerCase();
        return title.includes(searchStr) || description.includes(searchStr);
      });
      return searchResult.map(r => r.id);
    }
  },
);
