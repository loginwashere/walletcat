import {
  INVALIDATE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_LIST,
  RECEIVE_TRANSACTION_LIST
} from '../actions';

export default function transactions(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_TRANSACTION_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_TRANSACTION_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_TRANSACTION_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.transactions,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
