import axios from 'axios';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`;

export const INVALIDATE_APP_CURRENCY_LIST = 'INVALIDATE_APP_CURRENCY_LIST';

export const invalidateAppCurrencies = () => ({
  type: INVALIDATE_APP_CURRENCY_LIST
});

export const REQUEST_APP_CURRENCY_LIST = 'REQUEST_APP_CURRENCY_LIST';

export const requestAppCurrencies = () => ({
  type: REQUEST_APP_CURRENCY_LIST
});

export const RECEIVE_APP_CURRENCY_LIST = 'RECEIVE_APP_CURRENCY_LIST';

export const receiveAppCurrencies = json => ({
  type: RECEIVE_APP_CURRENCY_LIST,
  currencies: json.data.currencies,
  receivedAt: Date.now()
});

const fetchAppCurrencies = () => dispatch => {
  dispatch(requestAppCurrencies());
  const token = localStorage.getItem('token');
  return axios
    .get(API_APP_CURRENCY_LIST_URL, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(json => dispatch(receiveAppCurrencies(json)))
    .catch(error => dispatch(alertAdd(error)));
}

const shouldFetchAppCurrencies = state => {
  const currencies = state.currencies;
  if (!currencies.itemIds.length) {
    return true;
  } else if (currencies.isFetching) {
    return false;
  }
  return currencies.didInvalidate;
};

export const fetchAppCurrenciesIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchAppCurrencies(getState())) {
    return dispatch(fetchAppCurrencies());
  } else {
    return Promise.resolve();
  }
};
