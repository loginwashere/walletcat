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

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
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
        itemIds: [
          ...state.itemIds,
          ...action.categories
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
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
        itemIds: [
          ...state.itemIds,
          ...[action.category]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ]
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
        itemIds: [
          ...state.itemIds.slice(0, state.itemIds.indexOf(action.id)),
          ...state.itemIds.slice(state.itemIds.indexOf(action.id) + 1)
        ]
      }
    case LOGOUT_SUCCESS:
      return initialState
    default:
      return state
  }
}
