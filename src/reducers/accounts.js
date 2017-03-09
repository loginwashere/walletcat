import { createReducer } from 'redux-act'
import * as accountsActions from '../actions/accounts'
import * as authActions from '../actions/auth'
import { accountsPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export const accounts = createReducer({
  [accountsActions.invalidateAccounts]: state => ({
    ...state,
    didInvalidate: true
  }),
  [accountsActions.fetchAccountsRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [accountsActions.fetchAccountsSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.accounts
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [accountsActions.fetchAccountsFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [accountsActions.createAccountRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [accountsActions.createAccountSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [accountsActions.createAccountFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [accountsActions.updateAccountRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [accountsActions.updateAccountSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: payload.data
    },
  }),
  [accountsActions.updateAccountFailure]: state => ({
    ...state,
    isFetching: false
  }),

  [accountsActions.deleteAccountRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [accountsActions.deleteAccountSuccess]: (state, id) => ({
    ...state,
    isFetching: false,
    items: Object.keys(state.items)
      .filter(key => key !== id)
      .reduce((result, current) => {
        result[current] = state.items[current]
        return result
      }, {}),
  }),
  [accountsActions.deleteAccountFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [accountsPaginator.receivePage]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...accountsPaginator.itemsReducer(state.items, payload)
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default accounts
