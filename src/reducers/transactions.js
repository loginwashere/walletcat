import {
  INVALIDATE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_LIST,
  RECEIVE_TRANSACTION_LIST
} from '../actions';

export default function transactions(state = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: []
}, action) {
  let items, newItems;
  switch (action.type) {
    case INVALIDATE_TRANSACTION_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_TRANSACTION_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_TRANSACTION_LIST:
      items = {};
      action.transactions.forEach(item => items[item.id] = item);
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
    default:
      return state
  }
}
