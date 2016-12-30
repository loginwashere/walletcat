import {
  INVALIDATE_APP_CURRENCY_LIST,
  REQUEST_APP_CURRENCY_LIST,
  RECEIVE_APP_CURRENCY_LIST
} from '../actions';

export default function currencies(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_APP_CURRENCY_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_APP_CURRENCY_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_APP_CURRENCY_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.currencies,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
