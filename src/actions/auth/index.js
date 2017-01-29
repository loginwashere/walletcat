import { push } from 'react-router-redux'
import querystring from 'querystring'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import openPopup from '../../utils/popup'
import { API_URL } from '../../api/common'

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

export const REQUEST_OAUTH_SIGNIN = 'REQUEST_OAUTH_SIGNIN'
export const RECEIVE_OAUTH_SIGNIN = 'REQUEST_OAUTH_SIGNIN'

const requestOAuthSignIn = provider => ({
  type: REQUEST_OAUTH_SIGNIN,
  provider
})

const auth = (provider) => {
  const url = `${API_URL}oauth/callback/${provider}?popup=true`
  const popup = openPopup(provider, url, provider)
  return listenForCredentials(popup, provider)
}

const getSearchQs = function(location) {
  const rawQs = location.search || ''
  const qs = rawQs.replace('?', '')
  const qsObj = (qs)
    ? querystring.parse(qs)
    : {}

  return qsObj
}

function getAllParams(location) {
  return getSearchQs(location)
}

function listenForCredentials(popup, provider, resolve, reject) {
  if (!resolve) {
    return new Promise((resolve, reject) => {
      listenForCredentials(popup, provider, resolve, reject)
    })

  } else {
    let creds

    try {
      creds = getAllParams(popup.location)
    } catch (err) {} // eslint-disable-line no-empty

    if (creds && creds.id && creds.token) {
      popup.close()
      localStorage.setItem('token', creds.token)
      api.users
        .fetchOne(creds.id)
        .then(({ data }) => resolve({ data: { user: data, token: creds.token } }))
        .catch(({ error }) => reject({ error }))
    } else if (popup.closed) {
      reject({ error: 'Authentication was cancelled.' })
    } else {
      setTimeout(() => {
        listenForCredentials(popup, provider, resolve, reject)
      }, 0)
    }
  }
}

export const oauthSignIn = provider => dispatch => {
  dispatch(requestOAuthSignIn(provider))
  return auth(provider)
    .then(handleReceiveLogin(dispatch))
    .catch(({ error }) => {
      console.log(error)
      return dispatch(alertAdd({ response: { data: { message: error } } }))
    })
}
