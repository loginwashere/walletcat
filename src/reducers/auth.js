import { createReducer } from 'redux-act'
import jwtDecode from 'jwt-decode'
import * as authActions from '../actions/auth'

const getToken = () => localStorage.getItem('token')
const getUser = () => localStorage.getItem('user')

const decodeToken = token => {
  try {
    return jwtDecode(token)
  } catch (e) {
    return null
  }
}
const decodeUser = user => {
  try {
    return JSON.parse(user)
  } catch (e) {
    return null
  }
}
const getTokenExpirationDate = decodedToken => decodedToken
  ? decodedToken.exp
  : 0

const initialState = () => ({
  isFetching: false,
  isAuthenticated: !!decodeToken(getToken()),
  isEmailConfirmResent: false,
  tokenExpirationDate: getTokenExpirationDate(decodeToken(getToken())),
  user: decodeUser(getUser()),
  redirectUrl: ''
})

const auth = createReducer({
  [authActions.loginRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [authActions.loginSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    tokenExpirationDate: getTokenExpirationDate(decodeToken(getToken())),
    errorMessage: '',
    isAuthenticated: true,
    user: payload.data.user
  }),
  [authActions.loginFailure]: (state, payload) => ({
    ...state,
    isFetching: false,
    errorMessage: payload.message
  }),
  [authActions.logoutSuccess]: state => ({
    ...state,
    ...initialState()
  }),
  [authActions.setRedirectUrl]: (state, url) => ({
    ...state,
    redirectUrl: url
  }),
  [authActions.registerRequest]: (state) => ({
    ...state,
    isFetching: true
  }),
  [authActions.registerFailure]: (state) => ({
    ...state,
    isFetching: false
  }),
  [authActions.resendConfirmEmailRequest]: (state) => ({
    ...state,
    isFetching: true
  }),
  [authActions.resendConfirmEmailSuccess]: (state) => ({
    ...state,
    isEmailConfirmResent: true,
    isFetching: false
  }),
  [authActions.resendConfirmEmailFailure]: (state) => ({
    ...state,
    isFetching: false
  }),
  [authActions.confirmEmailRequest]: (state) => ({
    ...state,
    isFetching: true
  }),
  [authActions.confirmEmailFailure]: (state) => ({
    ...state,
    isFetching: false
  }),
}, initialState())

export default auth
