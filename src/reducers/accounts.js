import {
  INVALIDATE_ACCOUNT_LIST,
  REQUEST_ACCOUNT_LIST,
  RECEIVE_ACCOUNT_LIST,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_RECEIVE
} from '../actions';

export default function accounts(state = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: []
}, action) {
  let items, newItems;
  switch (action.type) {
    case INVALIDATE_ACCOUNT_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_ACCOUNT_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_ACCOUNT_LIST:
      items = {};
      action.accounts.forEach(item => items[item.id] = item);
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
    case ACCOUNT_CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case ACCOUNT_CREATE_RECEIVE:
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
      }
    default:
      return state
  }
}
