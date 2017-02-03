import { alertAdd } from '..'
import api from '../../api'
import { currenciesPaginator } from '../../reducers/currencies'

export const INVALIDATE_APP_CURRENCY_LIST = 'INVALIDATE_APP_CURRENCY_LIST'

export const invalidateAppCurrencies = () => ({
  type: INVALIDATE_APP_CURRENCY_LIST
})

export const REQUEST_APP_CURRENCY_LIST = 'REQUEST_APP_CURRENCY_LIST'

export const requestAppCurrencies = () => ({
  type: REQUEST_APP_CURRENCY_LIST
})

export const RECEIVE_APP_CURRENCY_LIST = 'RECEIVE_APP_CURRENCY_LIST'

export const receiveAppCurrencies = json => ({
  type: RECEIVE_APP_CURRENCY_LIST,
  currencies: json.data.currencies,
  receivedAt: Date.now()
})

const fetchAppCurrencies = ({ page, limit, filter }) => dispatch => {
  dispatch(requestAppCurrencies())
  !filter && dispatch(currenciesPaginator.requestPage(page, limit))
  return api.currencies
    .fetchAll({ page, limit, filter })
    .then(json => {
      dispatch(receiveAppCurrencies(json))
      !filter  && dispatch(
          currenciesPaginator.receivePage(
            parseInt(json.data.meta.page, 10),
            parseInt(json.data.meta.limit, 10),
            Boolean(json.data.meta.hasNextPage),
            json.data.currencies
          )
        )
      return Promise.resolve(json.data)
    })
    .catch(error => dispatch(alertAdd(error)))
}

const shouldFetchAppCurrencies = ({
  currencies: { isFetching, didInvalidate },
  pagination: { currencies: { currentPage } }
}, page, filter) => {
  if (filter || currentPage !== page) {
    return true
  } else if (isFetching) {
    return false
  }
  return didInvalidate
}

export const fetchAppCurrenciesIfNeeded = ({ page, limit, filter }) => (dispatch, getState) => {
  if (shouldFetchAppCurrencies(getState(), page, filter)) {
    return dispatch(fetchAppCurrencies({ page, limit, filter }))
  } else {
    return Promise.resolve()
  }
}
