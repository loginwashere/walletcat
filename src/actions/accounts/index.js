import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'

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

const fetchAccounts = () => dispatch => {
  dispatch(requestAccounts())
  return api.accounts
    .fetchAll()
    .then(json => dispatch(receiveAccounts(json)))
    .catch(error => dispatch(alertAdd(error)))
}

const shouldFetchAccounts = ({
  accounts: { itemIds, lastUpdated, isFetching, didInvalidate }
}) => {
  if (!itemIds.length || !lastUpdated) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAccountsIfNeeded = () => (dispatch, getState) => {
  if (shouldFetchAccounts(getState())) {
    return dispatch(fetchAccounts())
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
