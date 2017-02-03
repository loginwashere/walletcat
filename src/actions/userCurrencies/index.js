import { alertAdd } from '..'
import api from '../../api'
import { userCurrenciesPaginator } from '../../reducers/userCurrencies'

export const REQUEST_ADD_USER_CURRENCY = 'REQUEST_ADD_USER_CURRENCY'
export const RECEIVE_ADD_USER_CURRENCY = 'RECEIVE_ADD_USER_CURRENCY'
export const REQUEST_REMOVE_USER_CURRENCY = 'REQUEST_REMOVE_USER_CURRENCY'
export const RECEIVE_REMOVE_USER_CURRENCY = 'RECEIVE_REMOVE_USER_CURRENCY'

export const requestAddUserCurrency = currency => ({
  type: REQUEST_ADD_USER_CURRENCY,
  currency
})

export const receiveAddUserCurrency = json => ({
  type: RECEIVE_ADD_USER_CURRENCY,
  userCurrency: json.data
})

export const addUserCurrency = currency => dispatch => {
  dispatch(requestAddUserCurrency(currency))
  return api.userCurrencies
    .create({ currencyId: currency.id })
    .then(json => dispatch(receiveAddUserCurrency(json)))
    .catch(error => dispatch(alertAdd(error)))
}

export const requestRemoveUserCurrency = userCurrency => ({
  type: REQUEST_REMOVE_USER_CURRENCY,
  userCurrency
})

export const receiveRemoveUserCurrency = userCurrency => ({
  type: RECEIVE_REMOVE_USER_CURRENCY,
  userCurrency
})

export function removeUserCurrency(userCurrency) {
  return dispatch => {
    dispatch(requestRemoveUserCurrency(userCurrency))
    return api.userCurrencies
      .del(userCurrency.id)
      .then(() => dispatch(receiveRemoveUserCurrency(userCurrency)))
      .catch(error => dispatch(alertAdd(error)))
  }
}


export const INVALIDATE_USER_CURRENCY_LIST = 'INVALIDATE_USER_CURRENCY_LIST'

export const invalidateUserCurrencies = () => ({
  type: INVALIDATE_USER_CURRENCY_LIST
})

export const REQUEST_USER_CURRENCY_LIST = 'REQUEST_USER_CURRENCY_LIST'

export function requestUserCurrencies() {
  return {
    type: REQUEST_USER_CURRENCY_LIST
  }
}

export const RECEIVE_USER_CURRENCY_LIST = 'RECEIVE_USER_CURRENCY_LIST'

export function receiveUserCurrencies(json) {
  return {
    type: RECEIVE_USER_CURRENCY_LIST,
    userCurrencies: json.data.userCurrencies,
    receivedAt: Date.now()
  }
}

const fetchUserCurrencies = ({ page, limit, filter }) => dispatch => {
  dispatch(requestUserCurrencies())
  !filter && dispatch(userCurrenciesPaginator.requestPage(page, limit))
  return api.userCurrencies
    .fetchAll({ page, limit, filter })
    .then(json => {
      dispatch(receiveUserCurrencies(json))
      !filter && dispatch(
          userCurrenciesPaginator.receivePage(
            parseInt(json.data.meta.page, 10),
            parseInt(json.data.meta.limit, 10),
            Boolean(json.data.meta.hasNextPage),
            json.data.userCurrencies)
        )
      return Promise.resolve(json.data)
    })
    .catch(error => dispatch(alertAdd(error)))
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
    return dispatch(fetchUserCurrencies({ page, limit, filter }))
  } else {
    return Promise.resolve()
  }
}
