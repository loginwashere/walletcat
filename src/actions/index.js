import { fetchTransactionsIfNeeded } from './transactions'
import { fetchAccountsIfNeeded } from './accounts'
import { fetchCategoriesIfNeeded } from './categories'
import { fetchAppCurrenciesIfNeeded } from './currencies'
import { fetchUserCurrenciesIfNeeded } from './userCurrencies'

export * from './transactions'
export * from './auth'
export * from './alerts'
export * from './accounts'
export * from './categories'
export * from './currencies'
export * from './userCurrencies'

export function fetchTransactionsAccountsCategoriesIfNeeded() {
  return dispatch => Promise.all([
    dispatch(fetchTransactionsIfNeeded()),
    dispatch(fetchAccountsAndAppAndUserCurrenciesIfNeeded()),
    dispatch(fetchCategoriesIfNeeded())
  ])
}

export function fetchAppAndUserCurrenciesIfNeeded() {
  return dispatch => Promise.all([
    dispatch(fetchAppCurrenciesIfNeeded()),
    dispatch(fetchUserCurrenciesIfNeeded())
  ])
}

export function fetchAccountsAndAppAndUserCurrenciesIfNeeded() {
  return dispatch => Promise.all([
    dispatch(fetchAppAndUserCurrenciesIfNeeded()),
    dispatch(fetchAccountsIfNeeded())
  ])
}
