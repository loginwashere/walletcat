import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { transactionsPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const invalidateTransactions = createAction(`${PROJECT_ID}__TRANSACTION_LIST__INVALIDATE`)

export const fetchTransactionsRequest = createAction(`${PROJECT_ID}__TRANSACTION_LIST__REQUEST`)
export const fetchTransactionsSuccess = createAction(`${PROJECT_ID}__TRANSACTION_LIST__SUCCESS`)
export const fetchTransactionsFailure = createAction(`${PROJECT_ID}__TRANSACTION_LIST__FAILURE`)


export const fetchTransactionItemsRequest = createAction(`${PROJECT_ID}__TRANSACTION_ITEM_LIST__REQUEST`)
export const fetchTransactionItemsSuccess = createAction(`${PROJECT_ID}__TRANSACTION_ITEM_LIST__SUCCESS`)
export const fetchTransactionItemsFailure = createAction(`${PROJECT_ID}__TRANSACTION_ITEM_LIST__FAILURE`)

const fetchTransactionsPage = ({ page, limit }) => dispatch => {
  dispatch(transactionsPaginator.requestPage(page, limit))
  dispatch(fetchTransactionItemsRequest({ page, limit }))
  return api.transactions
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        transactionsPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.transactions
        )
      )
      dispatch(fetchTransactionItemsSuccess(response))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchTransactionsFailure(error))
      dispatch(fetchTransactionItemsFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchTransactionsFilter = (filter) => dispatch => {
  dispatch(fetchTransactionsRequest(filter))
  dispatch(fetchTransactionItemsRequest(filter))
  return api.transactions
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchTransactionsSuccess({ data: response.data }))
      dispatch(fetchTransactionItemsSuccess(response))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchTransactionsFailure(error))
      dispatch(fetchTransactionItemsFailure(error))
      dispatch(alertAdd(error))
    })
}

const shouldFetchTransactions = ({
  transactions: { isFetching, didInvalidate },
  pagination: { transactions: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchTransactionsIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchTransactions(getState(), page, filter)) {
    return filter
      ? dispatch(fetchTransactionsFilter(filter))
      : dispatch(fetchTransactionsPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}

export const createTransactionRequest = createAction(`${PROJECT_ID}__TRANSACTION_CREATE__REQUEST`)
export const createTransactionSuccess = createAction(`${PROJECT_ID}__TRANSACTION_CREATE__SUCCESS`)
export const createTransactionFailure = createAction(`${PROJECT_ID}__TRANSACTION_CREATE__FAILURE`)

export const createTransaction = params => dispatch => {
  dispatch(createTransactionRequest(params))
  return api.transactions
    .create(params)
    .then(response => {
      dispatch(createTransactionSuccess({ data: response.data }))
      dispatch(invalidateTransactions())
      dispatch(push('/transactions'))
    })
    .catch(error => {
      dispatch(createTransactionFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const deleteTransactionRequest = createAction(`${PROJECT_ID}__TRANSACTION_DELETE__REQUEST`)
export const deleteTransactionSuccess = createAction(`${PROJECT_ID}__TRANSACTION_DELETE__SUCCESS`)
export const deleteTransactionFailure = createAction(`${PROJECT_ID}__TRANSACTION_DELETE__FAILURE`)

export const deleteTransaction = id => dispatch => {
  dispatch(deleteTransactionRequest(id))
  return api.transactions
    .del(id)
    .then(() => {
      dispatch(deleteTransactionSuccess(id))
      dispatch(invalidateTransactions())
      dispatch(push('/transactions'))
    })
    .catch(error => {
      dispatch(deleteTransactionFailure(error))
      dispatch(alertAdd(error))
    })
}

export const updateTransactionRequest = createAction(`${PROJECT_ID}__TRANSACTION_UPDATE__REQUEST`)
export const updateTransactionSuccess = createAction(`${PROJECT_ID}__TRANSACTION_UPDATE__SUCCESS`)
export const updateTransactionFailure = createAction(`${PROJECT_ID}__TRANSACTION_UPDATE__FAILURE`)

export const updateTransaction = (id, params) => dispatch => {
  dispatch(updateTransactionRequest({ id, params }))
  return api.transactions
    .update(id, params)
    .then(response => {
      dispatch(updateTransactionSuccess({ data: response.data }))
      dispatch(invalidateTransactions())
      dispatch(push('/transactions'))
    })
    .catch(error => {
      dispatch(updateTransactionFailure(error))
      throw new SubmissionError(convertError(error))
    })
}
