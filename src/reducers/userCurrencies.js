import { createReducer } from 'redux-act'
import * as userCurrenciesActions from '../actions/userCurrencies'
import * as authActions from '../actions/auth'
import { userCurrenciesPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemsByCurrencyId: {}
}

export const userCurrencies = createReducer({
  [userCurrenciesActions.invalidateUserCurrencies]: state => ({
    ...state,
    didInvalidate: true
  }),
  [userCurrenciesActions.fetchUserCurrenciesRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [userCurrenciesActions.fetchUserCurrenciesSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.userCurrencies
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    },
    itemsByCurrencyId: {
      ...state.itemsByCurrencyId,
      ...payload.data.userCurrencies
        .reduce((obj, item) => ({ ...obj, [item.currencyId]: item.id }), {})
    },
  }),
  [userCurrenciesActions.fetchUserCurrenciesFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [userCurrenciesActions.addUserCurrencyRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [userCurrenciesActions.addUserCurrencySuccess]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
    itemsByCurrencyId: {
      ...state.itemsByCurrencyId,
      [payload.data.currencyId]: payload.data.id
    },
    isFetching: false,
  }),
  [userCurrenciesActions.addUserCurrencyFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [userCurrenciesActions.removeUserCurrencyRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [userCurrenciesActions.removeUserCurrencySuccess]: (state, payload) => ({
    ...state,
    items: Object.keys(state.items)
      .filter(key => key !== payload.id)
      .reduce((result, current) => {
        result[current] = state.items[current]
        return result
      }, {}),
    itemsByCurrencyId: Object.keys(state.itemsByCurrencyId)
      .filter(key => key !== payload.currencyId)
      .reduce((result, current) => {
        result[current] = state.itemsByCurrencyId[current]
        return result
      }, {}),
    isFetching: false,
  }),
  [userCurrenciesActions.removeUserCurrencyFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [userCurrenciesPaginator.receivePage]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...userCurrenciesPaginator.itemsReducer(state.items, payload)
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default userCurrencies
/*
export default function userCurrencies(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_USER_CURRENCY_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_USER_CURRENCY_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_USER_CURRENCY_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.userCurrencies
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        itemsByCurrencyId: {
          ...state.itemsByCurrencyId,
          ...action.userCurrencies
            .reduce((obj, item) => ({ ...obj, [item.currencyId]: item.id }), {})
        },
        lastUpdated: action.receivedAt
      }
    case REQUEST_ADD_USER_CURRENCY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_ADD_USER_CURRENCY:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.userCurrency.id]: action.userCurrency
        },
        itemsByCurrencyId: {
          ...state.itemsByCurrencyId,
          [action.userCurrency.currencyId]: action.userCurrency.id
        }
      }
    case REQUEST_REMOVE_USER_CURRENCY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_REMOVE_USER_CURRENCY:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: Object.keys(state.items)
          .filter(key => key !== action.userCurrency.id)
          .reduce((result, current) => {
            result[current] = state.items[current]
            return result
          }, {}),
        itemsByCurrencyId: Object.keys(state.itemsByCurrencyId)
          .filter(key => key !== action.userCurrency.currencyId)
          .reduce((result, current) => {
            result[current] = state.itemsByCurrencyId[current]
            return result
          }, {}),
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return {
        ...state,
        items: {
          ...state.items,
          ...userCurrenciesPaginator.itemsReducer(state.items, action)
        }
      }
  }
}
*/