import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import querystring from 'querystring'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import openPopup from '../../utils/popup'
import { API_URL, PROJECT_ID } from '../../config'

export const loginRequest = createAction(`${PROJECT_ID}__LOGIN__REQUEST`)
export const loginSuccess = createAction(`${PROJECT_ID}__LOGIN__SUCCESS`)
export const loginFailure = createAction(`${PROJECT_ID}__LOGIN__FAILURE`)

const handleReceiveLogin = dispatch => response =>  {
  localStorage.setItem('token', response.data.token)
  localStorage.setItem('user', JSON.stringify(response.data.user))

  dispatch(loginSuccess(response))
  return dispatch(push('/home'))
}

export const loginUser = creds => dispatch => {
  dispatch(loginRequest(creds))
  return api.auth
    .login(creds)
    .then(handleReceiveLogin(dispatch))
    .catch(error => {
      dispatch(loginFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const logoutRequest = createAction(`${PROJECT_ID}__LOGOUT__REQUEST`)
export const logoutSuccess = createAction(`${PROJECT_ID}__LOGOUT__SUCCESS`)

export const logoutUser = () => dispatch => {
  dispatch(logoutRequest());
  ['token', 'user'].map(item => localStorage.removeItem(item))
  dispatch(logoutSuccess())
  dispatch(push('/sign-in'))
}

export const registerRequest = createAction(`${PROJECT_ID}__REGISTER__REQUEST`)
export const registerFailure = createAction(`${PROJECT_ID}__REGISTER__FAILURE`)

export const registerUser = params => dispatch => {
  dispatch(registerRequest(params))
  return api.auth
    .register(params)
    .then(handleReceiveLogin(dispatch))
    .catch(error => {
      dispatch(registerFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const confirmEmailRequest = createAction(`${PROJECT_ID}__CONFIRM_EMAIL__REQUEST`)
export const confirmEmailFailure = createAction(`${PROJECT_ID}__CONFIRM_EMAIL__FAILURE`)

export const confirmEmail = code => dispatch => {
  dispatch(confirmEmailRequest(code))
  return api.auth
    .confirmEmail(code)
    .then(handleReceiveLogin(dispatch))
    .catch(error => {
      dispatch(confirmEmailFailure(error))
      dispatch(alertAdd(error))
    })
}

export const resendConfirmEmailRequest = createAction(`${PROJECT_ID}__RESEND_CONFIRM_EMAIL__REQUEST`)
export const resendConfirmEmailSuccess = createAction(`${PROJECT_ID}__RESEND_CONFIRM_EMAIL__SUCCESS`)
export const resendConfirmEmailFailure = createAction(`${PROJECT_ID}__RESEND_CONFIRM_EMAIL__FAILURE`)

export const resendConfirmEmail = email => dispatch => {
  dispatch(resendConfirmEmailRequest(email))
  return api.auth
    .resendConfirmEmail(email)
    .then(response => dispatch(resendConfirmEmailSuccess(response)))
    .catch(error => {
      dispatch(resendConfirmEmailFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const setRedirectUrl = createAction(`${PROJECT_ID}__REDIRECT_URL__SET`)
export const oAuthSignInRequest = createAction(`${PROJECT_ID}__OAUTH_SIGNIN__REQUEST`)
export const oAuthSignInFailure = createAction(`${PROJECT_ID}__OAUTH_SIGNIN__FAILURE`)

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
  dispatch(oAuthSignInRequest(provider))
  return auth(provider)
    .then(handleReceiveLogin(dispatch))
    .catch(({ error }) => {
      dispatch(oAuthSignInFailure(error))
      return dispatch(alertAdd({ response: { data: { message: error } } }))
    })
}
