import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_SUCCESS
} from '../actions';

export default function auth(
  state = {
    isFetching: false,
    isAuthenticated: localStorage.getItem('token') ? true : false,
    user: JSON.parse(localStorage.getItem('user'))
  },
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
        errorMessage: '',
        user: action.user
      })
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        errorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false
      });
    default:
      return state;
    }
}
