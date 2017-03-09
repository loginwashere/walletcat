import { combineReducers } from 'redux'
import createPaginator from '../utils/createPaginator'

export const accountsPaginator = createPaginator('/accounts/', 'accounts')
export const agentsPaginator = createPaginator('/agents/', 'agents')
export const categoriesPaginator = createPaginator('/categories/', 'categories')
export const currenciesPaginator = createPaginator('/currencies/', 'currencies')
export const transactionsPaginator = createPaginator('/transactions/', 'transactions')
export const userCurrenciesPaginator = createPaginator('/userCurrencies/', 'userCurrencies')

export default combineReducers({
  accounts: accountsPaginator.reducer,
  agents: agentsPaginator.reducer,
  categories: categoriesPaginator.reducer,
  currencies: currenciesPaginator.reducer,
  transactions: transactionsPaginator.reducer,
  userCurrencies: userCurrenciesPaginator.reducer
})