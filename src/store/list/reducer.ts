import { Reducer } from 'redux';
import { ListActionTypes, ListState } from './types';
import { normalize, schema } from 'normalizr';
import { Item, initialState, NormalizedData } from './types';
import { shuffleArray } from '../../Utils/helpers';

const item = new schema.Entity<Item>(
  'items',
  {},
  {
    idAttribute: value => (value.id ? value.id : value.title),
    processStrategy: (value, parentObj) => ({
      ...value,
      id: value.id ? value.id : value.title,
      hasList: value?.list?.length > 0,
      hasQuestion: value?.question?.length > 0,
      parentTitle: parentObj ? parentObj.title : null,
    }),
  },
);

item.define({
  list: [item],
});

const normalizedScheme = new schema.Array(item);

const reducer: Reducer<ListState> = (state = initialState, action) => {
  switch (action.type) {
    case ListActionTypes.FETCH_LIST_PENDING: {
      return { ...state, loading: true, error: undefined };
    }
    case ListActionTypes.FETCH_LIST_SUCCESS: {
      const normalizedData = normalize(action.payload, normalizedScheme);
      return { ...state, loading: false, data: normalizedData };
    }
    case ListActionTypes.FETCH_LIST_ERROR: {
      return { ...state, loading: false, error: action.payload };
    }
    case ListActionTypes.SEARCH_LIST: {
      return { ...state, search: action.payload };
    }
    case ListActionTypes.SHUFFLE: {
      const allItems: Item[] = Object.values(state.data?.entities?.items);

      // Shuffle all lists that references items
      const newItemsObj = allItems.reduce<NormalizedData<Item>>((acc, curr) => {
        if (curr.hasList && curr.list) {
          const newList = [...curr.list];
          shuffleArray(newList);
          acc[curr.id] = {
            ...curr,
            list: newList,
          };
          return acc;
        } else {
          acc[curr.id] = curr;
          return acc;
        }
      }, {});

      // Shuffle top list
      const newResult = [...(state.data?.result || [])];
      shuffleArray(newResult);
      return {
        ...state,
        data: {
          ...state.data,
          entities: {
            ...state.data?.entities,
            items: newItemsObj,
          },
          result: newResult,
        },
      };
    }
    case ListActionTypes.UPDATE_ITEM: {
      const { id, title, description } = action.payload;
      return {
        ...state,
        data: {
          ...state.data,
          entities: {
            ...state.data?.entities,
            items: {
              ...state.data?.entities.items,
              [id]: {
                ...state.data?.entities.items[id],
                title,
                description,
              },
            },
          },
        },
      };
    }
    case ListActionTypes.REMOVE_ITEM: {
      const id = action.payload;
      const allItems: Item[] = Object.values(state.data?.entities?.items);

      // Remove the item from items object, remove all references
      const newItemsObj = allItems.reduce<NormalizedData<Item>>((acc, curr) => {
        // Dont add the removed item to new object
        if (curr.id === id) {
          return acc;
        }
        // Check if an item has a reference to the removed item
        if (curr.hasList) {
          const newList = curr.list?.filter(itemId => itemId !== id) || [];
          acc[curr.id] = {
            ...curr,
            list: newList,
            hasList: newList?.length > 0,
          };
          return acc;
        } else {
          acc[curr.id] = curr;
          return acc;
        }
      }, {});

      // Remove refernce from top level result array
      const newResult = state.data?.result?.filter(itemId => itemId !== id);

      return {
        ...state,
        data: {
          ...state.data,
          entities: {
            ...state.data?.entities,
            items: newItemsObj,
          },
          result: newResult,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export { reducer as listReducer };
