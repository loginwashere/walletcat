import axios from 'axios';
import { push } from 'react-router-redux';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_ACCOUNT_LIST_URL = `${API_URL}accounts`;
export const INVALIDATE_ACCOUNT_LIST = 'INVALIDATE_ACCOUNT_LIST';

export const invalidateAccounts = () => ({
  type: INVALIDATE_ACCOUNT_LIST
});

export const REQUEST_ACCOUNT_LIST = 'REQUEST_ACCOUNT_LIST';

export const requestAccounts = () => ({
  type: REQUEST_ACCOUNT_LIST
});

export const RECEIVE_ACCOUNT_LIST = 'RECEIVE_ACCOUNT_LIST';

export const receiveAccounts = (json) => ({
  type: RECEIVE_ACCOUNT_LIST,
  accounts: json.data.accounts,
  receivedAt: Date.now()
});

const fetchAccounts = () => dispatch => {
  dispatch(requestAccounts());
  const token = localStorage.getItem('token');
  return axios
    .get(API_ACCOUNT_LIST_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(json => dispatch(receiveAccounts(json)))
    .catch(error => dispatch(alertAdd(error)));
};

const shouldFetchAccounts = ({
  accounts: { itemIds, lastUpdated, isFetching, didInvalidate }
}) => {
  if (!itemIds.length || !lastUpdated) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAccountsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchAccounts(getState())) {
    return dispatch(fetchAccounts());
  } else {
    return Promise.resolve();
  }
};

export const ACCOUNT_CREATE_REQUEST = 'ACCOUNT_CREATE_REQUEST';
export const ACCOUNT_CREATE_RECEIVE = 'ACCOUNT_CREATE_RECEIVE';
export const ACCOUNT_CREATE_FAILURE = 'ACCOUNT_CREATE_FAILURE';

const accountCreateRequest = (params) => ({
  type: ACCOUNT_CREATE_REQUEST
});

const accountCreateReceive = (json) => ({
  type: ACCOUNT_CREATE_RECEIVE,
  account: json.data,
  receivedAt: Date.now()
});

export const createAccount = params => dispatch => {
  const token = localStorage.getItem('token');
  dispatch(accountCreateRequest(params));
  return axios({
      url: API_ACCOUNT_LIST_URL,
      method: 'post',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      data: params
    })
    .then(json => {
      dispatch(accountCreateReceive(json));
      dispatch(push('/accounts'));
    })
    .catch(error => dispatch(alertAdd(error)));
};
