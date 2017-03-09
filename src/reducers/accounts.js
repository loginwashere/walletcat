import {
  INVALIDATE_ACCOUNT_LIST,
  REQUEST_ACCOUNT_LIST,
  RECEIVE_ACCOUNT_LIST,
  REQUEST_ACCOUNT_CREATE,
  RECEIVE_ACCOUNT_CREATE,
  REQUEST_ACCOUNT_UPDATE,
  RECEIVE_ACCOUNT_UPDATE,
  REQUEST_ACCOUNT_DELETE,
  RECEIVE_ACCOUNT_DELETE,
  LOGOUT_SUCCESS
} from '../actions'
import createPaginator from '../utils/createPaginator'

export const accountsPaginator = createPaginator('/accounts/', 'accounts')

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  lastUpdated: undefined
}

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_ACCOUNT_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_ACCOUNT_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_ACCOUNT_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.accounts
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        lastUpdated: action.receivedAt
      }
    case REQUEST_ACCOUNT_UPDATE:
    case REQUEST_ACCOUNT_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_ACCOUNT_UPDATE:
    case RECEIVE_ACCOUNT_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.account.id]: action.account
        },
      }
    case REQUEST_ACCOUNT_DELETE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_ACCOUNT_DELETE:
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
      return {
        ...state,
        items: {
          ...state.items,
          ...accountsPaginator.itemsReducer(state.items, action)
        }
      }
  }
}
