import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import transactions, { transactionsPaginator } from './transactions'
import transactionItems from './transactionItems'
import currencies, { currenciesPaginator } from './currencies'
import auth from './auth'
import alerts from './alerts'
import userCurrencies, { userCurrenciesPaginator } from './userCurrencies'
import categories, { categoriesPaginator } from './categories'
import accounts, { accountsPaginator } from './accounts'
import agents, { agentsPaginator } from './agents'

export default combineReducers({
  alerts,
  auth,
  currencies,
  userCurrencies,
  categories,
  accounts,
  agents,
  transactions,
  transactionItems,
  routing: routerReducer,
  form: formReducer,
  pagination: combineReducers({
    currencies: currenciesPaginator.reducer,
    userCurrencies: userCurrenciesPaginator.reducer,
    categories: categoriesPaginator.reducer,
    accounts: accountsPaginator.reducer,
    agents: agentsPaginator.reducer,
    transactions: transactionsPaginator.reducer,
  })
})
