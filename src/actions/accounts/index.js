import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { accountsPaginator } from '../../reducers/accounts'

export const INVALIDATE_ACCOUNT_LIST = 'INVALIDATE_ACCOUNT_LIST'

export const invalidateAccounts = () => ({
  type: INVALIDATE_ACCOUNT_LIST
})

export const REQUEST_ACCOUNT_LIST = 'REQUEST_ACCOUNT_LIST'

export const requestAccounts = () => ({
  type: REQUEST_ACCOUNT_LIST
})

export const RECEIVE_ACCOUNT_LIST = 'RECEIVE_ACCOUNT_LIST'

export const receiveAccounts = (json) => ({
  type: RECEIVE_ACCOUNT_LIST,
  accounts: json.data.accounts,
  receivedAt: Date.now()
})

const fetchAccounts = ({ page, limit, ids, filter }) => dispatch => {
  dispatch(requestAccounts());
  ((!ids || !ids.length) && !filter) && dispatch(accountsPaginator.requestPage(page, limit))
  return api.accounts
    .fetchAll({ page, limit, ids, filter })
    .then(json => {
      dispatch(receiveAccounts(json));
      ((!ids || !ids.length) && !filter) && dispatch(
        accountsPaginator.receivePage(
          parseInt(json.data.meta.page, 10),
          parseInt(json.data.meta.limit, 10),
          Boolean(json.data.meta.hasNextPage),
          json.data.accounts
        )
      )
      return Promise.resolve(json.data)
    })
    .catch(error => dispatch(alertAdd(error)))
}

const shouldFetchAccounts = ({
  accounts: { isFetching, didInvalidate },
  pagination: { accounts: { currentPage } }
}, page, ids, filter) => {
  if (ids || filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAccountsIfNeeded = ({ page, limit, ids, filter }) => (dispatch, getState) => {
  if (shouldFetchAccounts(getState(), page, ids, filter)) {
    return dispatch(fetchAccounts({ page, limit, ids, filter }))
  } else {
    return Promise.resolve()
  }
}

export const REQUEST_ACCOUNT_CREATE = 'REQUEST_ACCOUNT_CREATE'
export const RECEIVE_ACCOUNT_CREATE = 'RECEIVE_ACCOUNT_CREATE'
export const ACCOUNT_CREATE_FAILURE = 'ACCOUNT_CREATE_FAILURE'

const accountCreateRequest = () => ({
  type: REQUEST_ACCOUNT_CREATE
})

const accountCreateReceive = (json) => ({
  type: RECEIVE_ACCOUNT_CREATE,
  account: json.data,
  receivedAt: Date.now()
})

export const createAccount = params => dispatch => {
  dispatch(accountCreateRequest())
  return api.accounts
    .create(params)
    .then(json => {
      dispatch(accountCreateReceive(json))
      dispatch(push('/accounts'))
    })
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}

export const REQUEST_ACCOUNT_DELETE = 'REQUEST_ACCOUNT_DELETE'

const requestAccountDelete = id => ({
  type: REQUEST_ACCOUNT_DELETE,
  id
})

export const RECEIVE_ACCOUNT_DELETE = 'RECEIVE_ACCOUNT_DELETE'

const receiveAccountDelete = id => ({
  type: RECEIVE_ACCOUNT_DELETE,
  id
})

export const deleteAccount = id => dispatch => {
  dispatch(requestAccountDelete(id))
  return api.accounts
    .del(id)
    .then(() => {
      dispatch(receiveAccountDelete(id))
      dispatch(push('/accounts'))
    })
    .catch(error => dispatch(alertAdd(error)))
}

export const REQUEST_ACCOUNT_UPDATE = 'REQUEST_ACCOUNT_UPDATE'

const requestAccountUpdate = (id, params) => ({
  type: REQUEST_ACCOUNT_UPDATE,
  id,
  params
})

export const RECEIVE_ACCOUNT_UPDATE = 'RECEIVE_ACCOUNT_UPDATE'

const receiveAccountUpdate = json => ({
  type: RECEIVE_ACCOUNT_UPDATE,
  account: json.data
})

export const updateAccount = (id, params) => dispatch => {
  dispatch(requestAccountUpdate(id, params))
  return api.accounts
    .update(id, params)
    .then(json => {
      dispatch(receiveAccountUpdate(json))
      dispatch(push('/accounts'))
    })
    .catch(error => {
      throw new SubmissionError(convertError(error))
    })
}
