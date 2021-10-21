export interface NormalizedListData {
  entities:
    | {
        items: NormalizedData<Item>;
      }
    | any;
  result?: string[];
}

export interface NormalizedData<Item> {
  [uuid: string]: Item;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  displayName?: string;
  question?: string;
  type?: string;
  list?: string[];
  hasList: boolean;
  hasQuestion: boolean;
}

export enum ListActionTypes {
  FETCH_LIST_PENDING = 'list/FETCHING_PENDING',
  FETCH_LIST_SUCCESS = 'list/FETCHING_SUCCESS',
  FETCH_LIST_ERROR = 'list/FETCHING_ERROR',
  SEARCH_LIST = 'list/SEARCH',
  UPDATE_ITEM = 'list/UPDATE_ITEM',
  REMOVE_ITEM = 'list/REMOVE_ITEM',
}

export interface ListState {
  readonly loading: boolean;
  readonly data: NormalizedListData | undefined;
  readonly error?: string;
  search: string;
}

export const initialState: ListState = {
  data: undefined,
  error: undefined,
  loading: false,
  search: '',
};
