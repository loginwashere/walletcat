import axios from 'axios';
import { push } from 'react-router-redux';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_CATEGORY_LIST_URL = `${API_URL}categories`;

export const INVALIDATE_CATEGORY_LIST = 'INVALIDATE_CATEGORY_LIST';

export function invalidateCategories() {
  return {
    type: INVALIDATE_CATEGORY_LIST
  };
}

export const REQUEST_CATEGORY_LIST = 'REQUEST_CATEGORY_LIST';

export function requestCategories() {
  return {
    type: REQUEST_CATEGORY_LIST
  }
}

export const RECEIVE_CATEGORY_LIST = 'RECEIVE_CATEGORY_LIST';

export function receiveCategories(json) {
  return {
    type: RECEIVE_CATEGORY_LIST,
    categories: json.data.categories,
    receivedAt: Date.now()
  }
}

function fetchCategories() {
  return dispatch => {
    dispatch(requestCategories());
    const token = localStorage.getItem('token');
    return axios
      .get(API_CATEGORY_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveCategories(json)))
      .catch(error => dispatch(alertAdd(error)));
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
      // Dispatch a thunk from thunk!
      return dispatch(fetchCategories());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

export const REQUEST_CATEGORY_CREATE = 'REQUEST_CATEGORY_CREATE';

export function requestCategoryCreate() {
  return {
    type: REQUEST_CATEGORY_CREATE
  }
}

export const RECEIVE_CATEGORY_CREATE = 'RECEIVE_CATEGORY_CREATE';

export function receiveCategoryCreate(json) {
  return {
    type: RECEIVE_CATEGORY_CREATE,
    category: json.data,
    receivedAt: Date.now()
  }
}

export function createCategory(params) {
  return dispatch => {
    dispatch(requestCategoryCreate());
    const token = localStorage.getItem('token');
    return axios({
        url: API_CATEGORY_LIST_URL,
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: params
      })
      .then(json => {
        dispatch(receiveCategoryCreate(json));
        dispatch(push('/categories'));
      })
      .catch(error => dispatch(alertAdd(error)));
  }
}
