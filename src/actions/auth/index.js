import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
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

const handleReceiveLogin = dispatch => json =>  {
  localStorage.setItem('token', json.data.token)
  localStorage.setItem('user', JSON.stringify(json.data.user))

  dispatch(receiveLogin(json.data))
  return dispatch(push('/home'))
}

export const loginUser = creds => dispatch => {
  dispatch(requestLogin(creds))
  return api.auth
    .login(creds)
    .then(handleReceiveLogin(dispatch))
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

export const registerUser = params => dispatch => {
  dispatch(requestRegister(params))
  return api.auth
    .register(params)
    .then(handleReceiveLogin(dispatch))
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}

export const REQUEST_EMAIL_CONFIRM = 'REQUEST_EMAIL_CONFIRM'

const requestConfirmEmail = () => ({
  type: REQUEST_EMAIL_CONFIRM,
  isFetching: true
})

export const RECEIVE_EMAIL_CONFIRM = 'RECEIVE_EMAIL_CONFIRM'

export const confirmEmail = code => dispatch => {
  dispatch(requestConfirmEmail())
  return api.auth
    .confirmEmail(code)
    .then(handleReceiveLogin(dispatch))
    .catch(error => dispatch(alertAdd(error)))
}

export const REQUEST_RESEND_EMAIL_CONFIRM = 'REQUEST_RESEND_EMAIL_CONFIRM'

const requestResendConfirmEmail = () => ({
  type: REQUEST_RESEND_EMAIL_CONFIRM
})

export const RECEIVE_RESEND_EMAIL_CONFIRM = 'RECEIVE_RESEND_EMAIL_CONFIRM'

const receiveResendConfirmEmail = json => ({
  type: RECEIVE_RESEND_EMAIL_CONFIRM,
  data: json.data
})

export const resendConfirmEmail = email => dispatch => {
  dispatch(requestResendConfirmEmail())
  return api.auth
    .resendConfirmEmail(email)
    .then(json => dispatch(receiveResendConfirmEmail(json)))
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}

export const SET_REDIRECT_URL = 'SET_REDIRECT_URL'

export const setRedirectUrl = url => ({
  type: SET_REDIRECT_URL,
  url
})
