import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { transactionsPaginator } from '../../reducers/transactions'

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

const fetchTransactions = ({ page, limit, ids }) => dispatch => {
  dispatch(requestTransactions());
  (!ids || !ids.length) && dispatch(transactionsPaginator.requestPage(page, limit))
  return api.transactions
    .fetchAll({ page, limit, ids })
    .then(json => {
      dispatch(receiveTransactions(json));
      (!ids || !ids.length) && dispatch(
          transactionsPaginator.receivePage(
            parseInt(json.data.meta.page, 10),
            parseInt(json.data.meta.limit, 10),
            Boolean(json.data.meta.hasNextPage),
            json.data.transactions
          )
        )
      return Promise.resolve(json.data)
    })
    .catch(error => dispatch(alertAdd(error)))
}

function shouldFetchTransactions({
  transactions: { isFetching, didInvalidate },
  pagination: { transactions: { currentPage } }
}, page, ids) {
  if (ids || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchTransactionsIfNeeded = ({ page, limit, ids }) => (dispatch, getState) => {
  if (shouldFetchTransactions(getState(), page, ids)) {
    return dispatch(fetchTransactions({ page, limit, ids }))
  } else {
    return Promise.resolve()
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
    return api.transactions
      .create(params)
      .then(json => {
        dispatch(receiveTransactionCreate(json))
        dispatch(push('/transactions'))
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
    return api.transactions
      .del(id)
      .then(() => {
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
    return api.transactions
      .update(id, params)
      .then(json => {
        dispatch(receiveTransactionUpdate(json))
        dispatch(push('/transactions'))
      })
      .catch(error => {
        throw new SubmissionError(convertError(error))
      })
  }
}
