import {
  INVALIDATE_CATEGORY_LIST,
  REQUEST_CATEGORY_LIST,
  RECEIVE_CATEGORY_LIST,
  REQUEST_CATEGORY_CREATE,
  RECEIVE_CATEGORY_CREATE
} from '../actions';

export default function categories(state = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: []
}, action) {
  let items, newItems;
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
      items = {};
      action.categories.forEach(item => items[item.id] = item);
      newItems = {
        ...state.items,
        ...items
      };
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        itemIds: Object.keys(newItems),
        lastUpdated: action.receivedAt
      };
    case REQUEST_CATEGORY_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_CATEGORY_CREATE:
      items = {};
      [action.account].forEach(item => items[item.id] = item);
      newItems = {
        ...state.items,
        ...items
      };
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        itemIds: Object.keys(newItems)
      };
    default:
      return state
  }
}
