/* global localStorage */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE
} from '../actions'
import jwtDecode from 'jwt-decode'

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
  tokenExpirationDate: getTokenExpirationDate(decodeToken(getToken())),
  user: decodeUser(getUser())
})

export default function auth(
  state = initialState(),
  action
) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.creds
      })
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        tokenExpirationDate: getTokenExpirationDate(decodeToken(getToken())),
        errorMessage: '',
        user: action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, initialState())
    case REGISTER_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        user: action.params
      })
    case REGISTER_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: '',
        user: action.user
      })
    case REGISTER_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      })
    default:
      return state
  }
}
