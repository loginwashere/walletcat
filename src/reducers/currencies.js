import {
  INVALIDATE_APP_CURRENCY_LIST,
  REQUEST_APP_CURRENCY_LIST,
  RECEIVE_APP_CURRENCY_LIST,
  LOGOUT_SUCCESS
} from '../actions'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
  lastUpdated: undefined
}

export default function currencies(state = initialState, action) {
  let items, newItems
  switch (action.type) {
    case INVALIDATE_APP_CURRENCY_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_APP_CURRENCY_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_APP_CURRENCY_LIST:
      items = {}
      action.currencies.forEach(item => items[item.id] = item)
      newItems = {
        ...state.items,
        ...items
      }
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        itemIds: Object.keys(newItems),
        lastUpdated: action.receivedAt
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
