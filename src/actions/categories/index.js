import axios from 'axios'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { API_URL } from '../../apiUrl'
import { SubmissionError } from 'redux-form'

const API_CATEGORY_LIST_URL = `${API_URL}categories`

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

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories())
    const token = localStorage.getItem('token')
    return axios
      .get(API_CATEGORY_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveCategories(json)))
      .catch(error => dispatch(alertAdd(error)))
  }
}

const shouldFetchCategories = ({
  categories: { itemIds, lastUpdated, isFetching, didInvalidate }
}) => {
  if (!itemIds.length || !lastUpdated) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export function fetchCategoriesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchCategories(getState())) {
      return dispatch(fetchCategories())
    } else {
      return Promise.resolve()
    }
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
    const token = localStorage.getItem('token')
    return axios({
        url: API_CATEGORY_LIST_URL,
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: params
      })
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
    const token = localStorage.getItem('token')
    return axios({
        url: `${API_CATEGORY_LIST_URL}/${id}`,
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => {
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
    const token = localStorage.getItem('token')
    const { name, description } = params
    return axios({
        url: `${API_CATEGORY_LIST_URL}/${id}`,
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: { name, description }
      })
      .then(json => {
        dispatch(receiveCategoryUpdate(json))
        dispatch(push('/categories'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}
