import { combineReducers } from 'redux'

const REQUEST_PAGE = 'REQUEST_PAGE'
const RECEIVE_PAGE = 'RECEIVE_PAGE'

const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1

const createPaginator = (endpoint, resultKey) => {
  const requestPage = (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => ({
    type: REQUEST_PAGE,
    payload: {
      page,
      limit
    },
    meta: {
      endpoint,
      resultKey
    }
  })

  const receivePage = (page, limit, hasNextPage, results) => ({
    type: RECEIVE_PAGE,
    payload: {
      page,
      limit,
      hasNextPage,
      results
    },
    meta: {
      endpoint,
      resultKey
    }
  })

  const pages = (pages = {}, action = {}) => {
    switch (action.type) {
      case REQUEST_PAGE:
        return {
          ...pages,
          [action.payload.page]: {
            ids: [],
            fetching: true
          }
        }
      case RECEIVE_PAGE:
        return {
          ...pages,
          [action.payload.page]: {
            ids: action.payload.results.map(item => item.id),
            fetching: false
          }
        }
      default:
        return pages
    }
  }

  const currentPage = (currentPage = DEFAULT_PAGE, action = {}) =>
    action.type === REQUEST_PAGE
      ? action.payload.page
      : currentPage

  const hasNextPage = (hasNextPage = false, action = {}) =>
    action.type === RECEIVE_PAGE
      ? action.payload.hasNextPage
      : hasNextPage

  const onlyForEndpoint = (reducer) => (state = {}, action = {}) =>
    (typeof action.meta !== 'undefined' && action.meta.endpoint == endpoint)
      ? reducer(state, action)
      : state

  const itemsReducer = (items = {}, action = {}) => {
    switch (action.type) {
      case RECEIVE_PAGE: {
        return {
          ...items,
          ...action.payload.results
            .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
        }
      }
      default:
        return items
    }
  }

  const reducer = onlyForEndpoint(
    combineReducers({
      pages,
      currentPage,
      hasNextPage
    })
  )

  return {
    REQUEST_PAGE,
    RECEIVE_PAGE,
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    requestPage,
    receivePage,
    reducer,
    itemsReducer: onlyForEndpoint(itemsReducer)
  }
}

export default createPaginator
