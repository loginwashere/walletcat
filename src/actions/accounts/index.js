import axios from 'axios';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`;
export const INVALIDATE_ACCOUNT_LIST = 'INVALIDATE_ACCOUNT_LIST';

export function invalidateAccounts() {
  return {
    type: INVALIDATE_ACCOUNT_LIST
  };
}

export const REQUEST_ACCOUNT_LIST = 'REQUEST_ACCOUNT_LIST';

export function requestAccounts() {
  return {
    type: REQUEST_ACCOUNT_LIST
  }
}

export const RECEIVE_ACCOUNT_LIST = 'RECEIVE_ACCOUNT_LIST';

export function receiveAccounts(json) {
  return {
    type: RECEIVE_ACCOUNT_LIST,
    accounts: json.data.accounts,
    receivedAt: Date.now()
  }
}

function fetchAccounts() {
  return dispatch => {
    dispatch(requestAccounts());
    const token = localStorage.getItem('token');
    return axios
      .get(API_ACCOUNT_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveAccounts(json)))
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}

function shouldFetchAccounts(state) {
  const accounts = state.accounts;
  if (!accounts.isFetching) {
    return true
  } else if (accounts.isFetching) {
    return false
  } else {
    return accounts.didInvalidate
  }
}

export function fetchAccountsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAccounts(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchAccounts());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}