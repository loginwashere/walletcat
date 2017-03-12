import { createReducer, createAction } from 'redux-act'
import { combineReducers } from 'redux'
import { PROJECT_ID } from '../config'

const DEFAULT_LIMIT = 10
const DEFAULT_PAGE = 1

const createPaginator = (endpoint, resultKey) => {
  const REQUEST_PAGE = `${PROJECT_ID}__${resultKey.toUpperCase()}_PAGE__REQUEST`
  const RECEIVE_PAGE = `${PROJECT_ID}__${resultKey.toUpperCase()}_PAGE__RECEIVE`

  const requestPage = createAction(REQUEST_PAGE, (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT) => ({
    type: REQUEST_PAGE,
    payload: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10)
    },
    meta: {
      endpoint,
      resultKey
    }
  }), () => ({
    endpoint,
    resultKey
  }))

  const receivePage = createAction(RECEIVE_PAGE, (page, limit, hasNextPage, results) => ({
    type: RECEIVE_PAGE,
    payload: {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      hasNextPage: Boolean(hasNextPage),
      results
    },
    meta: {
      endpoint,
      resultKey
    }
  }), () => ({
    endpoint,
    resultKey
  }))

  const pages = createReducer({
    [requestPage]: (state, action) => ({
      ...state,
      [action.payload.page]: {
        ids: [],
        fetching: true
      }
    }),
    [receivePage]: (state, action) => ({
      ...state,
      [action.payload.page]: {
        ids: action.payload.results.map(item => item.id),
        fetching: false
      }
    }),
  }, {})

  const currentPage = createReducer({
    [requestPage]: (state, action) => action.payload.page
  }, DEFAULT_PAGE)

  const hasNextPage = createReducer({
    [receivePage]: (state, action) => action.payload.hasNextPage
  }, false )

  const onlyForEndpoint = (reducer) => (state = {}, action = {}) =>
    (typeof action.meta !== 'undefined' && action.meta.endpoint == endpoint)
      ? reducer(state, action)
      : state

  const itemsReducer = createReducer({
    [receivePage]: (state, payload) => ({
      ...state,
      ...payload.results
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    })
  }, {})

  const reducer = onlyForEndpoint(
    combineReducers({
      pages,
      currentPage,
      hasNextPage
    })
  )

  return {
    DEFAULT_PAGE,
    DEFAULT_LIMIT,
    requestPage,
    receivePage,
    reducer,
    itemsReducer: onlyForEndpoint(itemsReducer)
  }
}

export default createPaginator
