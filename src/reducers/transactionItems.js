import {
  // INVALIDATE_TRANSACTION_ITEM_LIST,
  // REQUEST_TRANSACTION_ITEM_LIST,
  RECEIVE_TRANSACTION_ITEM_LIST,
  // REQUEST_TRANSACTION_ITEM_CREATE,
  // RECEIVE_TRANSACTION_ITEM_CREATE,
  // REQUEST_TRANSACTION_ITEM_UPDATE,
  // RECEIVE_TRANSACTION_ITEM_UPDATE,
  // REQUEST_TRANSACTION_ITEM_DELETE,
  // RECEIVE_TRANSACTION_ITEM_DELETE,
  RECEIVE_TRANSACTION_CREATE,
  RECEIVE_TRANSACTION_UPDATE,
  LOGOUT_SUCCESS
} from '../actions'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: []
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
    /*
    case INVALIDATE_TRANSACTION_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_TRANSACTION_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TRANSACTION_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.transactions
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        itemIds: [
          ...state.itemIds,
          ...action.transactions
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
        lastUpdated: action.receivedAt
      }
      */
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
      /*
    case REQUEST_TRANSACTION_UPDATE:
    case REQUEST_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
      */
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
      /*
    case REQUEST_TRANSACTION_DELETE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_TRANSACTION_DELETE:
      return {
        ...state,
        isFetching: false,
        items: Object.keys(state.items)
          .filter(key => key !== action.id)
          .reduce((result, current) => {
            result[current] = state.items[current]
            return result
          }, {}),
        itemIds: [
          ...state.itemIds.slice(0, state.itemIds.indexOf(action.id)),
          ...state.itemIds.slice(state.itemIds.indexOf(action.id) + 1)
        ]
      }
      */
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
