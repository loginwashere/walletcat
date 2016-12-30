import {
  INVALIDATE_CATEGORY_LIST,
  REQUEST_CATEGORY_LIST,
  RECEIVE_CATEGORY_LIST,
  REQUEST_CATEGORY_CREATE,
  RECEIVE_CATEGORY_CREATE
} from '../actions';

export default function categories(state = {
  isFetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CATEGORY_LIST:
      return Object.assign({}, state, {
        didInvalidate: true
      })
    case REQUEST_CATEGORY_LIST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CATEGORY_LIST:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: action.categories,
        lastUpdated: action.receivedAt
      })
    case REQUEST_CATEGORY_CREATE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case RECEIVE_CATEGORY_CREATE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        items: [
          ...state.items,
          ...[action.category]
        ],
      })
    default:
      return state
  }
}
