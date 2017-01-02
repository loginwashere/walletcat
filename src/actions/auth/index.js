import axios from 'axios';
import { push } from 'react-router-redux';
import { alertAdd } from '..';
import { API_URL } from '../../apiUrl';

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

export function loginUser(creds) {
  const { email, password } = creds;

  return dispatch => {
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
          dispatch(loginError(json.data.message));
          return Promise.reject(json.data);
        } else {
          localStorage.setItem('token', json.data.token);
          localStorage.setItem('user', JSON.stringify(json.data.user));

          dispatch(receiveLogin(json.data));
          dispatch(push('/'));
        }
      })
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
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

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';


function requestRegister(params) {
  return {
    type: REGISTER_REQUEST,
    isFetching: true,
    params
  }
}

function receiveRegister(data) {
  return {
    type: REGISTER_SUCCESS,
    isFetching: false,
    user: data.user
  }
}

function registerError(message) {
  return {
    type: REGISTER_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    message
  }
}

export function registerUser(params) {
  const { email, username, password } = params;

  return dispatch => {
    dispatch(requestRegister(params));
    return axios
      .post(`${API_URL}users`, {
        email,
        username,
        password
      })
      .then((json) =>  {
        if (json.status === 401) {
          dispatch(push('/login'));
          return Promise.reject(json.data);
        } else if (!json.status === 200) {
          dispatch(registerError(json.data.message));
          return Promise.reject(json.data);
        } else {
          dispatch(receiveRegister(json.data));
          dispatch(push('/login'));
        }
      })
      .catch(error => dispatch(alertAdd({
          message: error.response.data.error,
          description: error.message
      })));
  }
}
