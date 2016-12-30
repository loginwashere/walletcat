import {
  INVALIDATE_USER_CURRENCY_LIST,
  REQUEST_USER_CURRENCY_LIST,
  RECEIVE_USER_CURRENCY_LIST,
  REQUEST_ADD_USER_CURRENCY,
  RECEIVE_ADD_USER_CURRENCY,
  REQUEST_REMOVE_USER_CURRENCY,
  RECEIVE_REMOVE_USER_CURRENCY
} from '../actions';

export default function userCurrencies(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_USER_CURRENCY_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_USER_CURRENCY_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_USER_CURRENCY_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.userCurrencies,
        lastUpdated: action.receivedAt
      })
    case REQUEST_ADD_USER_CURRENCY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_ADD_USER_CURRENCY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [
          ...state.items,
          ...[action.userCurrency]
        ],
        lastUpdated: action.receivedAt
      })
    case REQUEST_REMOVE_USER_CURRENCY:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_REMOVE_USER_CURRENCY:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: state.items.filter(item => item.id !== action.userCurrency.id),
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}
