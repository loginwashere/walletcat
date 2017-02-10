import { fetchTransactionsIfNeeded } from './transactions'
import { fetchAccountsIfNeeded } from './accounts'
import { fetchCategoriesIfNeeded } from './categories'
import { fetchAppCurrenciesIfNeeded } from './currencies'
import { fetchUserCurrenciesIfNeeded } from './userCurrencies'
import { fetchAgentsIfNeeded } from './agents'

export * from './transactions'
export * from './auth'
export * from './alerts'
export * from './accounts'
export * from './categories'
export * from './currencies'
export * from './userCurrencies'
export * from './agents'

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
    return dispatch(fetchAppCurrenciesIfNeeded({ filter: { id: currenciesIds } }))
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

const fetchAccountsCb = dispatch => data => {
  if (data && data.accounts && data.accounts.length) {
    const userCurrenciesIds = data.accounts.map(account => account.currencyId)
    const agentsIds = data.accounts.map(account => account.agentId)
    return Promise.all([
      dispatch(fetchUserCurrenciesIfNeeded({ filter: { id: userCurrenciesIds } }))
        .then(fetchCurrenciesCb(dispatch)),
      dispatch(fetchAgentsIfNeeded({ filter: { id: agentsIds } }))
    ])
  }
  return Promise.resolve()
}

export const fetchAccountsPageWithDependenies = ({ page, limit, filter }) => dispatch =>
  dispatch(fetchAccountsIfNeeded({ page, limit, filter }))
    .then(fetchAccountsCb(dispatch))

export const fetchUserCurrenciesPageWithDependencies = ({ page, limit, filter }) => dispatch =>
  dispatch(fetchUserCurrenciesIfNeeded({ page, limit, filter }))
    .then(fetchCurrenciesCb(dispatch))

export const fetchAppCurrenciesPageWithDependencies = ({ page, limit, filter }) => dispatch =>
  dispatch(fetchAppCurrenciesIfNeeded({ page, limit, filter }))
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

export const fetchTransactionsPageWithDependencies = ({ page, limit, filter }) => dispatch =>
  dispatch(fetchTransactionsIfNeeded({ page, limit, filter }))
    .then(data => {
      console.log('fetchTransactionsPageWithDependencies', data)
      if (data && data.transactions && data.transactions.length) {
        const accountsIds = data.transactions
          .map(transaction => transaction.transactionItems)
          .reduce((result, current) => result.concat(current), [])
          .map(transactionItem => transactionItem.accountId)
        const categoriesIds = data.transactions.map(transaction => transaction.categoryId)
        return Promise.all([
          dispatch(fetchAccountsIfNeeded({ filter: { id: accountsIds } }))
            .then(fetchAccountsCb(dispatch)),
          dispatch(fetchCategoriesIfNeeded({ filter: { id: categoriesIds } }))
        ])
      }
      return Promise.resolve()
    })

export const fetchAgentsPageWithDependencies =  ({ page, limit, filter }) => dispatch =>
  dispatch(fetchAgentsIfNeeded({ page, limit, filter }))

export const fetchCategoriesPageWithDependencies = ({ page, limit, filter }) => dispatch =>
  dispatch(fetchCategoriesIfNeeded({ page, limit, filter }))

export const fetchTransactionsPageDependencies = ({ accounts, categories }) => dispatch =>
  Promise.all([
    ...[accounts && dispatch(fetchAccountsPageWithDependenies(accounts))],
    ...[categories && dispatch(fetchCategoriesPageWithDependencies(categories))]
  ])
