import axios from 'axios';
import { push } from 'react-router-redux';
import { alertAdd } from '..';
import { convertError } from '..';
import { API_URL } from '../../apiUrl';
import { SubmissionError } from 'redux-form'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
});

const receiveLogin = data => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: data.token,
  user: data.user
});

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
});

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const loginUser = creds => dispatch => {
  const { login, password } = creds;
  dispatch(requestLogin(creds));
  return axios
    .post(`${API_URL}auth`, {
      login,
      password
    })
    .then((json) =>  {
      localStorage.setItem('token', json.data.token);
      localStorage.setItem('user', JSON.stringify(json.data.user));

      dispatch(receiveLogin(json.data));
      return dispatch(push('/'));
    })
    .catch(error => {
      throw new SubmissionError(convertError(error))
    });
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  ['token', 'user'].map(item => localStorage.removeItem(item));
  dispatch(receiveLogout());
  dispatch(push('/sign-in'));
};

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';

const requestRegister = params => ({
  type: REGISTER_REQUEST,
  isFetching: true,
  params
});

const receiveRegister = data => ({
  type: REGISTER_SUCCESS,
  isFetching: false,
  user: data.user
});

const registerError = message => ({
  type: REGISTER_FAILURE,
  isFetching: false,
  isAuthenticated: false,
  message
});

export const registerUser = params => dispatch => {
  const { email, username, password } = params;
  dispatch(requestRegister(params));
  return axios
    .post(`${API_URL}users`, {
      email,
      username,
      password
    })
    .then((json) =>  {
      if (json.status === 401) {
        dispatch(push('/sign-in'));
        return Promise.reject(json.data);
      } else if (!json.status === 200) {
        dispatch(registerError(json.data.message));
        return Promise.reject(json.data);
      } else {
        dispatch(receiveRegister(json.data));
        dispatch(push('/sign-in'));
      }
    })
    .catch(error => dispatch(alertAdd(error)));
};
