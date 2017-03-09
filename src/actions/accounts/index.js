import { createAction } from 'redux-act'
import { push } from 'react-router-redux'
import { alertAdd, convertError } from '..'
import { SubmissionError } from 'redux-form'
import api from '../../api'
import { accountsPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const invalidateAccounts = createAction(`${PROJECT_ID}__ACCOUNT_LIST__INVALIDATE`)

export const fetchAccountsRequest = createAction(`${PROJECT_ID}__ACCOUNT_LIST__REQUEST`)
export const fetchAccountsSuccess = createAction(`${PROJECT_ID}__ACCOUNT_LIST__SUCCESS`)
export const fetchAccountsFailure = createAction(`${PROJECT_ID}__ACCOUNT_LIST__FAILURE`)

const fetchAccountsPage = ({ page, limit }) => dispatch => {
  dispatch(accountsPaginator.requestPage(page, limit))
  return api.accounts
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        accountsPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.accounts
        )
      )
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchAccountsFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchAccountsFilter = (filter) => dispatch => {
  dispatch(fetchAccountsRequest())
  return api.accounts
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchAccountsSuccess({ data: response.data }))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchAccountsFailure(error))
      dispatch(alertAdd(error))
    })
}

const shouldFetchAccounts = ({
  accounts: { isFetching, didInvalidate },
  pagination: { accounts: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAccountsIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchAccounts(getState(), page, filter)) {
    return filter
      ? dispatch(fetchAccountsFilter(filter))
      : dispatch(fetchAccountsPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}

export const createAccountRequest = createAction(`${PROJECT_ID}__ACCOUNT_CREATE__REQUEST`)
export const createAccountSuccess = createAction(`${PROJECT_ID}__ACCOUNT_CREATE__SUCCESS`)
export const createAccountFailure = createAction(`${PROJECT_ID}__ACCOUNT_CREATE__FAILURE`)

export const createAccount = params => dispatch => {
  dispatch(createAccountRequest(params))
  return api.accounts
    .create(params)
    .then(response => {
      dispatch(createAccountSuccess({ data: response.data }))
      dispatch(invalidateAccounts())
      dispatch(push('/accounts'))
    })
    .catch(error => {
      dispatch(createAccountFailure(error))
      throw new SubmissionError(convertError(error))
    })
}

export const deleteAccountRequest = createAction(`${PROJECT_ID}__ACCOUNT_DELETE__REQUEST`)
export const deleteAccountSuccess = createAction(`${PROJECT_ID}__ACCOUNT_DELETE__SUCCESS`)
export const deleteAccountFailure = createAction(`${PROJECT_ID}__ACCOUNT_DELETE__FAILURE`)

export const deleteAccount = id => dispatch => {
  dispatch(deleteAccountRequest(id))
  return api.accounts
    .del(id)
    .then(() => {
      dispatch(deleteAccountSuccess(id))
      dispatch(invalidateAccounts())
      dispatch(push('/accounts'))
    })
    .catch(error => {
      dispatch(deleteAccountFailure(error))
      dispatch(alertAdd(error))
    })
}

export const updateAccountRequest = createAction(`${PROJECT_ID}__ACCOUNT_UPDATE__REQUEST`)
export const updateAccountSuccess = createAction(`${PROJECT_ID}__ACCOUNT_UPDATE__SUCCESS`)
export const updateAccountFailure = createAction(`${PROJECT_ID}__ACCOUNT_UPDATE__FAILURE`)

export const updateAccount = (id, params) => dispatch => {
  dispatch(updateAccountRequest({ id, params }))
  return api.accounts
    .update(id, params)
    .then(response => {
      dispatch(updateAccountSuccess({ data: response.data }))
      dispatch(push('/accounts'))
    })
    .catch(error => {
      dispatch(updateAccountFailure(error))
      throw new SubmissionError(convertError(error))
    })
}
