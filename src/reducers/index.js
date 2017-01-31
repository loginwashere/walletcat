import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import transactions, { transactionsPaginator } from './transactions'
import currencies, { currenciesPaginator } from './currencies'
import auth from './auth'
import alerts from './alerts'
import userCurrencies, { userCurrenciesPaginator } from './userCurrencies'
import categories, { categoriesPaginator } from './categories'
import accounts, { accountsPaginator } from './accounts'

export default combineReducers({
  alerts,
  auth,
  currencies,
  userCurrencies,
  categories,
  accounts,
  transactions,
  routing: routerReducer,
  form: formReducer,
  pagination: combineReducers({
    currencies: currenciesPaginator.reducer,
    userCurrencies: userCurrenciesPaginator.reducer,
    categories: categoriesPaginator.reducer,
    accounts: accountsPaginator.reducer,
    transactions: transactionsPaginator.reducer,
  })
})
