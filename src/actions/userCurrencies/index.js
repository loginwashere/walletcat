import axios from 'axios';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

const API_USER_CURRENCY_LIST_URL = `${API_URL}user-currencies`;

export const REQUEST_ADD_USER_CURRENCY = 'REQUEST_ADD_USER_CURRENCY';
export const RECEIVE_ADD_USER_CURRENCY = 'RECEIVE_ADD_USER_CURRENCY';
export const REQUEST_REMOVE_USER_CURRENCY = 'REQUEST_REMOVE_USER_CURRENCY';
export const RECEIVE_REMOVE_USER_CURRENCY = 'RECEIVE_REMOVE_USER_CURRENCY';

export function requestAddUserCurrency(currency) {
  return {
    type: REQUEST_ADD_USER_CURRENCY,
    currency
  }
}

export function receiveAddUserCurrency(json) {
  return {
    type: RECEIVE_ADD_USER_CURRENCY,
    userCurrency: json.data
  }
}

export function addUserCurrency(currency) {
  return dispatch => {
    dispatch(requestAddUserCurrency(currency));
    const token = localStorage.getItem('token');
    return axios({
        url: `${API_URL}user-currencies`,
        method: 'post',
        data: {
          currencyId: currency.id
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveAddUserCurrency(json)))
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}

export function requestRemoveUserCurrency(userCurrency) {
  return {
    type: REQUEST_REMOVE_USER_CURRENCY,
    userCurrency
  }
}

export function receiveRemoveUserCurrency(userCurrency) {
  return {
    type: RECEIVE_REMOVE_USER_CURRENCY,
    userCurrency
  }
}

export function removeUserCurrency(userCurrency) {
  return dispatch => {
    dispatch(requestRemoveUserCurrency(userCurrency));
    const token = localStorage.getItem('token');
    const userCurrencyId = userCurrency.id;
    return axios
      .delete(`${API_URL}user-currencies/${userCurrencyId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveRemoveUserCurrency(userCurrency)))
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}


export const INVALIDATE_USER_CURRENCY_LIST = 'INVALIDATE_USER_CURRENCY_LIST';

export function invalidateUserCurrencies() {
  return {
    type: INVALIDATE_USER_CURRENCY_LIST
  };
}

export const REQUEST_USER_CURRENCY_LIST = 'REQUEST_USER_CURRENCY_LIST';

export function requestUserCurrencies() {
  return {
    type: REQUEST_USER_CURRENCY_LIST
  }
}

export const RECEIVE_USER_CURRENCY_LIST = 'RECEIVE_USER_CURRENCY_LIST';

export function receiveUserCurrencies(json) {
  return {
    type: RECEIVE_USER_CURRENCY_LIST,
    userCurrencies: json.data.userCurrencies,
    receivedAt: Date.now()
  }
}

function fetchUserCurrencies() {
  return dispatch => {
    dispatch(requestUserCurrencies());
    const token = localStorage.getItem('token');
    return axios
      .get(API_USER_CURRENCY_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveUserCurrencies(json)))
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}

function shouldFetchUserCurrencies(state) {
  const currencies = state.userCurrencies;
  if (!currencies.isFetching) {
    return true
  } else if (currencies.isFetching) {
    return false
  } else {
    return currencies.didInvalidate
  }
}

export function fetchUserCurrenciesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUserCurrencies(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchUserCurrencies());
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve();
    }
  };
}
