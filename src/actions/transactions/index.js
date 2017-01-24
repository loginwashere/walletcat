import axios from 'axios'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { API_URL } from '../../apiUrl'
import { SubmissionError } from 'redux-form'

export const API_TRANSACTION_LIST_URL = `${API_URL}transactions`
export const INVALIDATE_TRANSACTION_LIST = 'INVALIDATE_TRANSACTION_LIST'

export function invalidateTransactions() {
  return {
    type: INVALIDATE_TRANSACTION_LIST
  }
}

export const REQUEST_TRANSACTION_LIST = 'REQUEST_TRANSACTION_LIST'

function requestTransactions() {
  return {
    type: REQUEST_TRANSACTION_LIST
  }
}

export const RECEIVE_TRANSACTION_LIST = 'RECEIVE_TRANSACTION_LIST'

function receiveTransactions(json) {
  return {
    type: RECEIVE_TRANSACTION_LIST,
    transactions: json.data.transactions,
    receivedAt: Date.now()
  }
}

function fetchTransactions() {
  return dispatch => {
    dispatch(requestTransactions())
    const token = localStorage.getItem('token')
    return axios
      .get(API_TRANSACTION_LIST_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => dispatch(receiveTransactions(json)))
      .catch(error => dispatch(alertAdd(error)))
  }
}

function shouldFetchTransactions(state) {
  const transactions = state.transactions
  if (!transactions.itemIds.length) {
    return true
  } else if (transactions.isFetching) {
    return false
  } else {
    return transactions.didInvalidate
  }
}

export function fetchTransactionsIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchTransactions(getState())) {
      return dispatch(fetchTransactions())
    } else {
      return Promise.resolve()
    }
  }
}

export const REQUEST_TRANSACTION_CREATE = 'REQUEST_TRANSACTION_CREATE'
export const RECEIVE_TRANSACTION_CREATE = 'RECEIVE_TRANSACTION_CREATE'

export function requestTransactionCreate() {
  return {
    type: REQUEST_TRANSACTION_CREATE
  }
}

export function receiveTransactionCreate(json) {
  return {
    type: RECEIVE_TRANSACTION_CREATE,
    transaction: json.data,
    receivedAt: Date.now()
  }
}

export function createTransaction(params) {
  return dispatch => {
    dispatch(requestTransactionCreate())
    const token = localStorage.getItem('token')
    return axios({
        url: API_TRANSACTION_LIST_URL,
        method: 'post',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: params
      })
      .then(json => {
        dispatch(receiveTransactionCreate(json))
        dispatch(push('/transactions'));
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}

export const REQUEST_TRANSACTION_DELETE = 'REQUEST_TRANSACTION_DELETE'

function requestTransactionDelete(id) {
  return {
    type: REQUEST_TRANSACTION_DELETE,
    id
  }
}

export const RECEIVE_TRANSACTION_DELETE = 'RECEIVE_TRANSACTION_DELETE'

function receiveTransactionDelete(id) {
  return {
    type: RECEIVE_TRANSACTION_DELETE,
    id
  }
}

export function deleteTransaction(id) {
  return dispatch => {
    dispatch(requestTransactionDelete(id))
    const token = localStorage.getItem('token')
    return axios({
        url: `${API_TRANSACTION_LIST_URL}/${id}`,
        method: 'delete',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(json => {
        dispatch(receiveTransactionDelete(id))
        dispatch(push('/transactions'))
      })
      .catch(error => dispatch(alertAdd(error)))
  }
}

export const REQUEST_TRANSACTION_UPDATE = 'REQUEST_TRANSACTION_UPDATE'

function requestTransactionUpdate(id, params) {
  return {
    type: REQUEST_TRANSACTION_UPDATE,
    id,
    params
  }
}

export const RECEIVE_TRANSACTION_UPDATE = 'RECEIVE_TRANSACTION_UPDATE'

function receiveTransactionUpdate(json) {
  return {
    type: RECEIVE_TRANSACTION_UPDATE,
    transaction: json.data
  }
}

export function updateTransaction(id, params) {
  return dispatch => {
    dispatch(requestTransactionUpdate(id, params))
    const token = localStorage.getItem('token')
    return axios({
        url: `${API_TRANSACTION_LIST_URL}/${id}`,
        method: 'put',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        data: params
      })
      .then(json => {
        dispatch(receiveTransactionUpdate(json))
        dispatch(push('/transactions'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}
