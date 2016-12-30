import {
  INVALIDATE_ACCOUNT_LIST,
  REQUEST_ACCOUNT_LIST,
  RECEIVE_ACCOUNT_LIST
} from '../actions';

export default function accounts(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_ACCOUNT_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_ACCOUNT_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ACCOUNT_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.accounts,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
