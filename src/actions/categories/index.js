import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { categoriesPaginator } from '../../reducers/categories'

export const INVALIDATE_CATEGORY_LIST = 'INVALIDATE_CATEGORY_LIST'

export function invalidateCategories() {
  return {
    type: INVALIDATE_CATEGORY_LIST
  }
}

export const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORY_LIST'

export function requestCategories() {
  return {
    type: REQUEST_CATEGORY_LIST
  }
}

export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST'

export function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORY_LIST,
    categories: json.data.categories,
    receivedAt: Date.now()
  }
}

function fetchCategories({ page, limit, ids, filter }) {
  return dispatch => {
    dispatch(requestCategories());
    ((!ids || !ids.length) && !filter) && dispatch(categoriesPaginator.requestPage(page, limit))
    return api.categories
      .fetchAll({ page, limit, ids, filter })
      .then(json => {
        dispatch(receiveCategories(json));
        ((!ids || !ids.length) && !filter) && dispatch(
            categoriesPaginator.receivePage(
              parseInt(json.data.meta.page, 10),
              parseInt(json.data.meta.limit, 10),
              Boolean(json.data.meta.hasNextPage),
              json.data.categories
            )
          )
        return Promise.resolve(json.data)
      })
      .catch(error => dispatch(alertAdd(error)))
  }
}

const shouldFetchCategories = ({
  categories: { isFetching, didInvalidate },
  pagination: { categories: { currentPage } }
}, page, ids, filter) => {
  if (ids || filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchCategoriesIfNeeded = ({ page, limit, ids, filter }) => (dispatch, getState) => {
  if (shouldFetchCategories(getState(), page, ids, filter)) {
    return dispatch(fetchCategories({ page, limit, ids, filter }))
  } else {
    return Promise.resolve()
  }
}

export const REQUEST_CATEGORY_CREATE = 'REQUEST_CATEGORY_CREATE'

export function requestCategoryCreate() {
  return {
    type: REQUEST_CATEGORY_CREATE
  }
}

export const RECEIVE_CATEGORY_CREATE = 'RECEIVE_CATEGORY_CREATE'

export function receiveCategoryCreate(json) {
  return {
    type: RECEIVE_CATEGORY_CREATE,
    category: json.data,
    receivedAt: Date.now()
  }
}

export function createCategory(params) {
  return dispatch => {
    dispatch(requestCategoryCreate())
    return api.categories
      .create(params)
      .then(json => {
        dispatch(receiveCategoryCreate(json))
        dispatch(push('/categories'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}

export const REQUEST_CATEGORY_DELETE = 'REQUEST_CATEGORY_DELETE'

function requestCategoryDelete(id) {
  return {
    type: REQUEST_CATEGORY_DELETE,
    id
  }
}

export const RECEIVE_CATEGORY_DELETE = 'RECEIVE_CATEGORY_DELETE'

function receiveCategoryDelete(id) {
  return {
    type: RECEIVE_CATEGORY_DELETE,
    id
  }
}

export function deleteCategory(id) {
  return dispatch => {
    dispatch(requestCategoryDelete(id))
    return api.categories
      .del(id)
      .then(() => {
        dispatch(receiveCategoryDelete(id))
        dispatch(push('/categories'))
      })
      .catch(error => dispatch(alertAdd(error)))
  }
}

export const REQUEST_CATEGORY_UPDATE = 'REQUEST_CATEGORY_UPDATE'

function requestCategoryUpdate(id, params) {
  return {
    type: REQUEST_CATEGORY_UPDATE,
    id,
    params
  }
}

export const RECEIVE_CATEGORY_UPDATE = 'RECEIVE_CATEGORY_UPDATE'

function receiveCategoryUpdate(json) {
  return {
    type: RECEIVE_CATEGORY_UPDATE,
    category: json.data
  }
}

export function updateCategory(id, params) {
  return dispatch => {
    dispatch(requestCategoryUpdate(id, params))
    return api.categories
      .update(id, params)
      .then(json => {
        dispatch(receiveCategoryUpdate(json))
        dispatch(push('/categories'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}
