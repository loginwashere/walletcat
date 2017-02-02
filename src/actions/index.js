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

const fetchCurrenciesCb = dispatch => data => {
  if (data && data.userCurrencies) {
    const userCurrencies = data.userCurrencies
    const currenciesIds = data.userCurrencies.map(userCurrency => userCurrency.currencyId)
    return dispatch(fetchAppCurrenciesIfNeeded({ ids: currenciesIds }))
      .then(data => {
        const currencies = data.currencies
        return Promise.resolve({
          userCurrencies,
          currencies
        })
      })
  }
  return Promise.resolve()
}

const fetchUserCurrenciesCb = dispatch => data => {
  if (data && data.accounts && data.accounts.length) {
    const userCurrenciesIds = data.accounts.map(account => account.currencyId)
    return dispatch(fetchUserCurrenciesIfNeeded({ ids: userCurrenciesIds }))
      .then(fetchCurrenciesCb(dispatch))
  }
  return Promise.resolve()
}

export const fetchAccountsPageWithDependenies = ({ page, limit, ids } = {}) => dispatch =>
  dispatch(fetchAccountsIfNeeded({ page, limit, ids }))
    .then(fetchUserCurrenciesCb(dispatch))

export const fetchUserCurrenciesPageWithDependencies = ({ page, limit, ids, filter } = {}) => dispatch =>
  dispatch(fetchUserCurrenciesIfNeeded({ page, limit, ids, filter }))
    .then(fetchCurrenciesCb(dispatch))

export const fetchAppCurrenciesPageWithDependencies = ({ page, limit, ids, filter } = {}) => dispatch =>
  dispatch(fetchAppCurrenciesIfNeeded({ page, limit, ids, filter }))
    .then(data => {
      if (data && data.currencies && data.currencies.length) {
        const currencies = data.currencies
        const currenciesIds = data.currencies.map(currency => currency.id)
        return dispatch(fetchUserCurrenciesIfNeeded({ filter: { currencyId: currenciesIds } }))
          .then(data => {
            const userCurrencies = data.userCurrencies
            return Promise.resolve({
              userCurrencies,
              currencies
            })
          })
      }
      return Promise.resolve()
    })

export const fetchTransactionsPageWithDependencies = ({ page, limit, ids } = {}) => dispatch =>
  dispatch(fetchTransactionsIfNeeded({ page, limit, ids }))
    .then(data => {
      console.log(data)
      if (data && data.transactions && data.transactions.length) {
        const accountsIds = data.transactions.map(transaction => transaction.fromAccountId)
          .concat(data.transactions.map(transaction => transaction.toAccountId))
        const categoriesIds = data.transactions.map(transaction => transaction.categoryId)
        return Promise.all([
          dispatch(fetchAccountsIfNeeded({ ids: accountsIds }))
            .then(fetchUserCurrenciesCb(dispatch)),
          dispatch(fetchCategoriesIfNeeded({ ids: categoriesIds }))
        ])
      }
      return Promise.resolve()
    })

export const fetchCategoriesPageWithDependencies = ({ page, limit, ids, filter } = {}) => dispatch =>
  dispatch(fetchCategoriesIfNeeded({ page, limit, ids, filter }))

export const fetchTransactionsPageDependencies = ({ accounts, categories }) => dispatch =>
  Promise.all([
    ...[accounts && dispatch(fetchAccountsPageWithDependenies(accounts))],
    ...[categories && dispatch(fetchCategoriesPageWithDependencies(categories))]
  ])