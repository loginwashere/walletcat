import {
  INVALIDATE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_LIST,
  RECEIVE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_CREATE,
  RECEIVE_TRANSACTION_CREATE,
  REQUEST_TRANSACTION_UPDATE,
  RECEIVE_TRANSACTION_UPDATE,
  REQUEST_TRANSACTION_DELETE,
  RECEIVE_TRANSACTION_DELETE,
  LOGOUT_SUCCESS
} from '../actions'
import createPaginator from '../utils/createPaginator'

export const transactionsPaginator = createPaginator('/transactions/', 'transactions')

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export default function transactions(state = initialState, action) {
  switch (action.type) {
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
            .map(transaction => ({
              ...transaction,
              transactionItems: transaction.transactionItems
                .map(item => item.id)
            }))
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        lastUpdated: action.receivedAt
      }
    case REQUEST_TRANSACTION_UPDATE:
    case REQUEST_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_TRANSACTION_UPDATE:
    case RECEIVE_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.transaction.id]: {
            ...action.transaction,
            transactionItems: action.transaction.transactionItems
              .map(item => item.id)
          }
        },
      }
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
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
