import axios from 'axios';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`;

export const INVALIDATE_APP_CURRENCY_LIST = 'INVALIDATE_APP_CURRENCY_LIST';

export function invalidateAppCurrencies() {
  return {
    type: INVALIDATE_APP_CURRENCY_LIST
  };
}

export const REQUEST_APP_CURRENCY_LIST = 'REQUEST_APP_CURRENCY_LIST';

export function requestAppCurrencies() {
  return {
    type: REQUEST_APP_CURRENCY_LIST
  }
}

export const RECEIVE_APP_CURRENCY_LIST = 'RECEIVE_APP_CURRENCY_LIST';

export function receiveAppCurrencies(json) {
  return {
    type: RECEIVE_APP_CURRENCY_LIST,
    currencies: json.data.currencies,
    receivedAt: Date.now()
  }
}

function fetchAppCurrencies() {
  return dispatch => {
    dispatch(requestAppCurrencies());
    const token = localStorage.getItem('token');
    return axios
      .get(API_APP_CURRENCY_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveAppCurrencies(json)))
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}

function shouldFetchAppCurrencies(state) {
  const currencies = state.currencies;
  if (!currencies.itemIds.length) {
    return true
  } else if (currencies.isFetching) {
    return false
  } else {
    return currencies.didInvalidate
  }
}

export function fetchAppCurrenciesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchAppCurrencies(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchAppCurrencies());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}