import axios from 'axios';
import { push } from 'react-router-redux';

console.log('process.env.REACT_APP_PUBLIC_URL', process.env.REACT_APP_PUBLIC_URL);

const API_URL = `${process.env.REACT_APP_PUBLIC_URL || 'http://localhost:3000/'}api/`;
const API_APP_CURRENCY_LIST_URL = `${API_URL}currencies`;
const API_USER_CURRENCY_LIST_URL = `${API_URL}user-currencies`;
const API_CATEGORY_LIST_URL = `${API_URL}categories`;
const API_ACCOUNT_LIST_URL = `${API_URL}accounts`;
const API_TRANSACTION_LIST_URL = `${API_URL}transactions`;

// There are three possible states for our login
// process and we need actions for each of them
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

function requestLogin(creds) {
  return {
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    creds
  }
}

function receiveLogin(data) {
  return {
    type: LOGIN_SUCCESS,
    isFetching: false,
    isAuthenticated: true,
    token: data.token,
    user: data.user
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

// Three possible states for our logout process as well.
// Since we are using JWTs, we just need to remove the token
// from localStorage. These actions are more useful if we
// were calling the API to log the user out
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
    isFetching: true,
    isAuthenticated: true
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
    isFetching: false,
    isAuthenticated: false
  }
}

// Calls the API to get a token and
// dispatches actions along the way
export function loginUser(creds) {
  const { email, password } = creds;

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin(creds));
    return axios
      .post(`${API_URL}auth`, {
        email,
        password
      })
      .then((json) =>  {
        if (json.status === 401) {
          dispatch(push('/login'));
          return Promise.reject(json.data);
        } else if (!json.status === 200) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(json.data.message));
          return Promise.reject(json.data);
        } else {
          // If login was successful, set the token in local storage
          localStorage.setItem('token', json.data.token);
          localStorage.setItem('user', JSON.stringify(json.data.user));

          // Dispatch the success action
          dispatch(receiveLogin(json.data));
          dispatch(push('/'));
        }
      })
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
  }
}

export function logoutUser() {
  return (dispatch) => {
    dispatch(requestLogout());
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch(receiveLogout());
    dispatch(push('/login'));
  }
}

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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
  }
}

function shouldFetchAppCurrencies(state) {
  const currencies = state.currencies;
  if (!currencies.isFetching) {
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

export const ALERT_ADD = 'ALERT_ADD';
export const ALERT_REMOVE = 'ALERT_REMOVE';

function rand() {
    const n = Math.random()*1e17;
    return (n + "").substr(1,16);
}

export function alertAdd(alert) {
  const alertWithId = {
    ...alert,
    id: rand()
  }
  return {
    type: ALERT_ADD,
    alert: alertWithId
  }
}

export function removeAlert(alert) {
  return {
    type: ALERT_REMOVE,
    alert
  }
}

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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
  }
}

function shouldFetchCategories(state) {
  const categories = state.categories;
  if (!categories.isFetching) {
    return true
  } else if (categories.isFetching) {
    return false
  } else {
    return categories.didInvalidate
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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
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
      .catch((error) => {
        dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
        }));
      });
  }
}

function shouldFetchTransactions(state) {
  const transactions = state.transactions;
  if (!transactions.isFetching) {
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
