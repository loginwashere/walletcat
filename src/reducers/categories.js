import {
  INVALIDATE_CATEGORY_LIST,
  REQUEST_CATEGORY_LIST,
  RECEIVE_CATEGORY_LIST,
  REQUEST_CATEGORY_CREATE,
  RECEIVE_CATEGORY_CREATE,
  REQUEST_CATEGORY_DELETE,
  RECEIVE_CATEGORY_DELETE,
  REQUEST_CATEGORY_UPDATE,
  RECEIVE_CATEGORY_UPDATE,
  LOGOUT_SUCCESS
} from '../actions'
import createPaginator from '../utils/createPaginator'

export const categoriesPaginator = createPaginator('/categories/', 'categories')

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  lastUpdated: undefined
}

export default function categories(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY_LIST:
      return {
        ...state,
        didInvalidate: true
      }
    case REQUEST_CATEGORY_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CATEGORY_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.categories
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        },
        lastUpdated: action.receivedAt
      }
    case REQUEST_CATEGORY_UPDATE:
    case REQUEST_CATEGORY_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      }
    case RECEIVE_CATEGORY_UPDATE:
    case RECEIVE_CATEGORY_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.category.id]: action.category
        },
      }
    case REQUEST_CATEGORY_DELETE:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_CATEGORY_DELETE:
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
          ...categoriesPaginator.itemsReducer(state.items, action)
        }
      }
  }
}
