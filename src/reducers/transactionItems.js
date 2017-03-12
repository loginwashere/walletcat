import { createReducer } from 'redux-act'
import * as transactionsActions from '../actions/transactions'
import * as authActions from '../actions/auth'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

const transactionItems = createReducer({
  [transactionsActions.fetchTransactionItemsSuccess]: (state, payload) => {
    const transactionItems = payload.data.transactions
      .map(transaction => transaction.transactionItems)
      .reduce((result, current) => result.concat(current), [])
    return {
      ...state,
      isFetching: false,
      didInvalidate: false,
      items: {
        ...state.items,
        ...transactionItems
          .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      },
    }
  },
  [transactionsActions.updateTransactionSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.transactionItems
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [transactionsActions.createTransactionSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.transactionItems
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default transactionItems
