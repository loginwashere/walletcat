import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form'
import { intlReducer } from 'react-intl-redux'
import transactions from './transactions'
import transactionItems from './transactionItems'
import currencies from './currencies'
import auth from './auth'
import alerts from './alerts'
import userCurrencies from './userCurrencies'
import categories from './categories'
import accounts from './accounts'
import agents from './agents'
import pagination from './pagination'

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
  intl: intlReducer,
  pagination
})
