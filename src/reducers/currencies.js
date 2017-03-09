import { createReducer } from 'redux-act'
import * as currenciesActions from '../actions/currencies'
import * as authActions from '../actions/auth'
import { currenciesPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export const currencies = createReducer({
  [currenciesActions.invalidateCurrencies]: state => ({
    ...state,
    didInvalidate: true
  }),
  [currenciesActions.fetchCurrenciesRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [currenciesActions.fetchCurrenciesSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.currencies
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [currenciesActions.fetchCurrenciesFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [currenciesPaginator.receivePage]: (state, payload) => ({
    ...state,
    items: {
      ...state.items,
      ...currenciesPaginator.itemsReducer(state.items, payload)
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default currencies
