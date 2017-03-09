import {
  RECEIVE_TRANSACTION_ITEM_LIST,
  RECEIVE_TRANSACTION_CREATE,
  RECEIVE_TRANSACTION_UPDATE,
  LOGOUT_SUCCESS
} from '../actions'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case RECEIVE_TRANSACTION_ITEM_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.transactionItems
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        lastUpdated: action.receivedAt
      }
    case RECEIVE_TRANSACTION_UPDATE:
    case RECEIVE_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.transaction.transactionItems
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        }
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
