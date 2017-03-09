import { createAction } from 'redux-act'
import { alertAdd } from '..'
import api from '../../api'
import { currenciesPaginator } from '../../reducers/pagination'
import { PROJECT_ID } from '../../config'

export const invalidateCurrencies = createAction(`${PROJECT_ID}__CURRENCY_LIST__INVALIDATE`)

export const fetchCurrenciesRequest = createAction(`${PROJECT_ID}__CURRENCY_LIST__REQUEST`)
export const fetchCurrenciesSuccess = createAction(`${PROJECT_ID}__CURRENCY_LIST__SUCCESS`)
export const fetchCurrenciesFailure = createAction(`${PROJECT_ID}__CURRENCY_LIST__FAILURE`)

const fetchCurrenciesPage = ({ page, limit }) => dispatch => {
  dispatch(currenciesPaginator.requestPage(page, limit))
  return api.currencies
    .fetchAll({ page, limit })
    .then(response => {
      dispatch(
        currenciesPaginator.receivePage(
          response.data.meta.page,
          response.data.meta.limit,
          response.data.meta.hasNextPage,
          response.data.currencies
        )
      )
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchCurrenciesFailure(error))
      dispatch(alertAdd(error))
    })
}

const fetchCurrenciesFilter = (filter) => dispatch => {
  dispatch(fetchCurrenciesRequest())
  return api.currencies
    .fetchAll({ filter })
    .then(response => {
      dispatch(fetchCurrenciesSuccess({ data: response.data }))
      return Promise.resolve(response.data)
    })
    .catch(error => {
      dispatch(fetchCurrenciesFailure(error))
      dispatch(alertAdd(error))
    })
}

const shouldFetchCurrencies = ({
  currencies: { isFetching, didInvalidate },
  pagination: { currencies: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  } else {
    return didInvalidate
  }
}

export const fetchAppCurrenciesIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchCurrencies(getState(), page, filter)) {
    return filter
      ? dispatch(fetchCurrenciesFilter(filter))
      : dispatch(fetchCurrenciesPage({ page, limit }))
  } else {
    return Promise.resolve()
  }
}
