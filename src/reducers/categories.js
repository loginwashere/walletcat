import {
  INVALIDATE_CATEGORY_LIST,
  REQUEST_CATEGORY_LIST,
  RECEIVE_CATEGORY_LIST,
  REQUEST_CATEGORY_CREATE,
  RECEIVE_CATEGORY_CREATE,
  LOGOUT_SUCCESS
} from '../actions';

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
  lastUpdated: undefined
};

export default function categories(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_CATEGORY_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_CATEGORY_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.categories
            .reduce((obj, item) => ({...obj, [item.id]: item}), {})
        },
        itemIds: [
          ...state.itemIds,
          ...action.categories
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
        lastUpdated: action.receivedAt
      };
    case REQUEST_CATEGORY_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_CATEGORY_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.category.id]: action.category
        },
        itemIds: [
          ...state.itemIds,
          ...[action.category]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ]
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state
  }
}
