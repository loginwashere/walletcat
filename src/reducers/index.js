import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {
  INVALIDATE_APP_CURRENCY_LIST,
  REQUEST_APP_CURRENCY_LIST,
  RECEIVE_APP_CURRENCY_LIST,
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  ALERT_ADD, ALERT_REMOVE,
  REQUEST_ADD_USER_CURRENCY, RECEIVE_ADD_USER_CURRENCY,
  REQUEST_REMOVE_USER_CURRENCY, RECEIVE_REMOVE_USER_CURRENCY,
  INVALIDATE_USER_CURRENCY_LIST,
  REQUEST_USER_CURRENCY_LIST,
  RECEIVE_USER_CURRENCY_LIST,
  INVALIDATE_CATEGORY_LIST, REQUEST_CATEGORY_LIST, RECEIVE_CATEGORY_LIST,
  REQUEST_CATEGORY_CREATE, RECEIVE_CATEGORY_CREATE,
  INVALIDATE_ACCOUNT_LIST, REQUEST_ACCOUNT_LIST, RECEIVE_ACCOUNT_LIST,
  INVALIDATE_TRANSACTION_LIST, REQUEST_TRANSACTION_LIST, RECEIVE_TRANSACTION_LIST
} from '../actions';

export function currencies(state = {
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

// The auth reducer. The starting state sets authentication
// based on a token being in local storage. In a real app,
// we would also want a util to check if the token is expired.
export function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: JSON.parse(localStorage.getItem('user'))
  },
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        errorMessage: '',
        user: action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
    }
}

export function alerts(state = { items: [] }, action) {
  switch (action.type) {
    case ALERT_ADD:
      return Object.assign({}, state, {
        items: [
          ...state.items,
          ...[action.alert]
        ]
      });
    case ALERT_REMOVE:
      return Object.assign({}, state, {
        items: state.items.filter((item) => item.id !== action.alert.id)
      });
    default:
      return state;
  }
}

export function userCurrencies(state = {
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

export function categories(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_CATEGORY_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CATEGORY_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    case REQUEST_CATEGORY_CREATE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CATEGORY_CREATE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [
          ...state.items,
          ...[action.category]
        ],
      })
    default:
      return state
  }
}

export function accounts(state = {
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

export function transactions(state = {
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

export default combineReducers({
  alerts,
  auth,
  currencies,
  userCurrencies,
  categories,
  accounts,
  transactions,
  routing: routerReducer
});