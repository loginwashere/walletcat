import axios from 'axios';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

export const API_TRANSACTION_LIST_URL = `${API_URL}transactions`;
export const INVALIDATE_TRANSACTION_LIST = 'INVALIDATE_TRANSACTION_LIST';

export function invalidateTransactions() {
  return {
    type: INVALIDATE_TRANSACTION_LIST
  };
}

export const REQUEST_TRANSACTION_LIST = 'REQUEST_TRANSACTION_LIST';

export function requestTransactions() {
  return {
    type: REQUEST_TRANSACTION_LIST
  }
}

export const RECEIVE_TRANSACTION_LIST = 'RECEIVE_TRANSACTION_LIST';

export function receiveTransactions(json) {
  return {
    type: RECEIVE_TRANSACTION_LIST,
    transactions: json.data.transactions,
    receivedAt: Date.now()
  }
}

function fetchTransactions() {
  return dispatch => {
    dispatch(requestTransactions());
    const token = localStorage.getItem('token');
    return axios
      .get(API_TRANSACTION_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveTransactions(json)))
      .catch(error => dispatch(alertAdd(error)));
  }
}

function shouldFetchTransactions(state) {
  const transactions = state.transactions;
  if (!transactions.itemIds.length) {
    return true
  } else if (transactions.isFetching) {
    return false
  } else {
    return transactions.didInvalidate
  }
}

export function fetchTransactionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTransactions(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchTransactions());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}

export const REQUEST_TRANSACTION_CREATE = 'REQUEST_TRANSACTION_CREATE';
export const RECEIVE_TRANSACTION_CREATE = 'RECEIVE_TRANSACTION_CREATE';