interface NomralizedListData {
  entities:
    | {
        items: NormalizedData<Item>;
      }
    | any;
  result: string[];
}

export interface NormalizedData<T> {
  [uuid: string]: T;
}

export interface Item {
  id?: string;
  title: string;
  description: string;
  displayName?: string;
  question?: string;
  type?: string;
  list?: Item[];
}

export enum ListActionTypes {
  FETCH_LIST_PENDING = 'list/PENDING',
  FETCH_LIST_SUCCESS = 'list/SUCCESS',
  FETCH_LIST_ERROR = 'list/ERROR',
}

export interface ListState {
  readonly loading: boolean;
  readonly data: NomralizedListData | undefined;
  readonly error?: string;
}
