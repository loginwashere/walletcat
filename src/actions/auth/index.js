/* global localStorage */

import { push } from 'react-router-redux'
import { convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'

export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

const requestLogin = creds => ({
  type: LOGIN_REQUEST,
  isFetching: true,
  isAuthenticated: false,
  creds
})

const receiveLogin = data => ({
  type: LOGIN_SUCCESS,
  isFetching: false,
  isAuthenticated: true,
  token: data.token,
  user: data.user
})

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST'
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS'
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE'

const requestLogout = () => ({
  type: LOGOUT_REQUEST,
  isFetching: true,
  isAuthenticated: true
})

const receiveLogout = () => ({
  type: LOGOUT_SUCCESS,
  isFetching: false,
  isAuthenticated: false
})

export const loginUser = creds => dispatch => {
  dispatch(requestLogin(creds))
  return api.auth
    .login(creds)
    .then((json) =>  {
      localStorage.setItem('token', json.data.token)
      localStorage.setItem('user', JSON.stringify(json.data.user))

      dispatch(receiveLogin(json.data))
      return dispatch(push('/home'))
    })
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}

export const logoutUser = () => dispatch => {
  dispatch(requestLogout());
  ['token', 'user'].map(item => localStorage.removeItem(item))
  dispatch(receiveLogout())
  dispatch(push('/sign-in'))
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'

const requestRegister = params => ({
  type: REGISTER_REQUEST,
  isFetching: true,
  params
})

const receiveRegister = data => ({
  type: REGISTER_SUCCESS,
  isFetching: false,
  user: data.user
})

export const registerUser = params => dispatch => {
  dispatch(requestRegister(params))
  return api.auth
    .register(params)
    .then((json) =>  {
      dispatch(receiveRegister(json.data))
      return dispatch(push('/sign-in'))
    })
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}
