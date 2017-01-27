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

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
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
        itemIds: [
          ...state.itemIds,
          ...action.userCurrencies
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
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
        itemIds: [
          ...state.itemIds,
          ...[action.userCurrency]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
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
        itemIds: [
          ...state.itemIds.slice(0, state.itemIds.indexOf(action.userCurrency.id)),
          ...state.itemIds.slice(state.itemIds.indexOf(action.userCurrency.id) + 1)
        ],
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
      return state
  }
}
