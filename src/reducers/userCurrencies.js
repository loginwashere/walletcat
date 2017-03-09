import {
  INVALIDATE_USER_CURRENCY_LIST,
  REQUEST_USER_CURRENCY_LIST,
  RECEIVE_USER_CURRENCY_LIST,
  REQUEST_ADD_USER_CURRENCY,
  RECEIVE_ADD_USER_CURRENCY,
  REQUEST_REMOVE_USER_CURRENCY,
  RECEIVE_REMOVE_USER_CURRENCY,
  LOGOUT_SUCCESS
} from '../actions'
import createPaginator from '../utils/createPaginator'

export const userCurrenciesPaginator = createPaginator('/userCurrencies/', 'userCurrencies')

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemsByCurrencyId: {}
}

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
