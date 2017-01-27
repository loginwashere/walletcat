import { alertAdd } from '..'
import api from '../../api'

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

function fetchUserCurrencies() {
  return dispatch => {
    dispatch(requestUserCurrencies())
    return api.userCurrencies
      .fetchAll()
      .then(json => dispatch(receiveUserCurrencies(json)))
      .catch(error => dispatch(alertAdd(error)))
  }
}

function shouldFetchUserCurrencies(state) {
  const currencies = state.userCurrencies
  if (!currencies.itemIds.length) {
    return true
  } else if (currencies.isFetching) {
    return false
  } else {
    return currencies.didInvalidate
  }
}

export function fetchUserCurrenciesIfNeeded() {
  return (dispatch, getState) => {
    if (shouldFetchUserCurrencies(getState())) {
      return dispatch(fetchUserCurrencies())
    } else {
      return Promise.resolve()
    }
  }
}
