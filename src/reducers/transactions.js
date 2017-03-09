import { createReducer } from 'redux-act'
import * as transactionsActions from '../actions/transactions'
import * as authActions from '../actions/auth'
import { transactionsPaginator } from './pagination'

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {}
}

export const transactions = createReducer({
  [transactionsActions.invalidateTransactions]: state => ({
    ...state,
    didInvalidate: true
  }),
  [transactionsActions.fetchTransactionsRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [transactionsActions.fetchTransactionsSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      ...payload.data.transactions
        .map(transaction => ({
          ...transaction,
          transactionItems: transaction.transactionItems
            .map(item => item.id)
        }))
        .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
    }
  }),
  [transactionsActions.fetchTransactionsFailure]: (state) => ({
    ...state,
    isFetching: false,
  }),
  [transactionsActions.createTransactionRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [transactionsActions.createTransactionSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: {
        ...payload.data,
        transactionItems: payload.data.transactionItems
          .map(item => item.id)
      }
    },
  }),
  [transactionsActions.createTransactionFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [transactionsActions.updateTransactionRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [transactionsActions.updateTransactionSuccess]: (state, payload) => ({
    ...state,
    isFetching: false,
    didInvalidate: false,
    items: {
      ...state.items,
      [payload.data.id]: {
        ...payload.data,
        transactionItems: payload.data.transactionItems
          .map(item => item.id)
      }
    },
  }),
  [transactionsActions.updateTransactionFailure]: state => ({
    ...state,
    isFetching: false
  }),

  [transactionsActions.deleteTransactionRequest]: state => ({
    ...state,
    isFetching: true
  }),
  [transactionsActions.deleteTransactionSuccess]: (state, id) => ({
    ...state,
    isFetching: false,
    items: Object.keys(state.items)
      .filter(key => key !== id)
      .reduce((result, current) => {
        result[current] = state.items[current]
        return result
      }, {}),
  }),
  [transactionsActions.deleteTransactionFailure]: state => ({
    ...state,
    isFetching: false
  }),
  [transactionsPaginator.receivePage]: (state, payload) => {
    const items = transactionsPaginator.itemsReducer(state.items, payload)
    return {
      ...state,
      items: {
        ...state.items,
        ...Object.keys(items)
          .map(id => ({
            ...items[id],
            transactionItems: items[id].transactionItems
              .map(item => item.id)
          }))
          .reduce((obj, item) => ({ ...obj, [item.id]: item }), {})
      }
    }
  },
  [authActions.logoutSuccess]: () => initialState,
}, initialState)

export default transactions
