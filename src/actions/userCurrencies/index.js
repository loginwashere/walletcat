import { createAction } from 'redux-act'
import { alertAdd } from '..'
import api from '../../api'
import { userCurrenciesPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const addUserCurrencyRequest = createAction(`${PROJECT_ID}__USER_CURRENCY_ADD__REQUEST`)
export const addUserCurrencySuccess = createAction(`${PROJECT_ID}__USER_CURRENCY_ADD__SUCCESS`)
export const addUserCurrencyFailure = createAction(`${PROJECT_ID}__USER_CURRENCY_ADD__FAILURE`)

export const addUserCurrency = currency => dispatch => {
  dispatch(addUserCurrencyRequest(currency))
  return api.userCurrencies
    .create({ currencyId: currency.id })
    .then(json => dispatch(addUserCurrencySuccess(json)))
    .catch(error => {
      dispatch(addUserCurrencyFailure(error))
      dispatch(alertAdd(error))
    })
}

export const removeUserCurrencyRequest = createAction(`${PROJECT_ID}__USER_CURRENCY_REMOVE__REQUEST`)
export const removeUserCurrencySuccess = createAction(`${PROJECT_ID}__USER_CURRENCY_REMOVE__SUCCESS`)
export const removeUserCurrencyFailure = createAction(`${PROJECT_ID}__USER_CURRENCY_REMOVE__FAILURE`)

export const removeUserCurrency = userCurrency => dispatch => {
  dispatch(removeUserCurrencyRequest(userCurrency))
  return api.userCurrencies
    .del(userCurrency.id)
    .then(() => dispatch(removeUserCurrencySuccess(userCurrency)))
    .catch(error => {
      dispatch(removeUserCurrencyFailure(error))
      dispatch(alertAdd(error))
    })
}

export const invalidateUserCurrencies = createAction(`${PROJECT_ID}__USER_CURRENCY_LIST__INVALIDATE`)

export const fetchUserCurrenciesRequest = createAction(`${PROJECT_ID}__USER_CURRENCY_LIST__REQUEST`)
export const fetchUserCurrenciesSuccess = createAction(`${PROJECT_ID}__USER_CURRENCY_LIST__SUCCESS`)
export const fetchUserCurrenciesFailure = createAction(`${PROJECT_ID}__USER_CURRENCY_LIST__FAILURE`)

const fetchUserCurrenciesPage = ({ page, limit }) => dispatch => {
  dispatch(userCurrenciesPaginator.requestPage(page, limit))
  return api.userCurrencies
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        userCurrenciesPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.userCurrencies
        )
      )
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchUserCurrenciesFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchUserCurrenciesFilter = (filter) => dispatch => {
  dispatch(fetchUserCurrenciesRequest(filter))
  return api.userCurrencies
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchUserCurrenciesSuccess({ data: response.data }))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchUserCurrenciesFailure(error))
      dispatch(alertAdd(error))
    })
}

const shouldFetchUserCurrencies = ({
  userCurrencies: { isFetching, didInvalidate },
  pagination: { userCurrencies: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchUserCurrenciesIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchUserCurrencies(getState(), page, filter)) {
    return filter
      ? dispatch(fetchUserCurrenciesFilter(filter))
      : dispatch(fetchUserCurrenciesPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}
