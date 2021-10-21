import { Reducer } from 'redux';
import { ListActionTypes, ListState } from './types';
import { normalize, schema } from 'normalizr';
import { Item, initialState } from './types';

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
      console.log(normalizedData);
      return { ...state, loading: false, data: normalizedData };
    }
    case ListActionTypes.FETCH_LIST_ERROR: {
      return { ...state, loading: false, error: action.payload };
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
      return { ...state, loading: false, error: action.payload };
    }
    default: {
      return state;
    }
  }
};

export { reducer as listReducer };
