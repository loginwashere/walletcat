import deepFreeze from 'deep-freeze'
import { v4 } from 'uuid'
import reducer, {
  initialState as expectedDefaultInitialState
} from '../transactions'
import * as actions from '../../actions'

describe('transactions reducer', () => {
  const firstTransaction = { id: v4(), description: 'Inceprion' }
  const secondTransaction = { id: v4(), description: 'Seven' }
  const initialState = undefined
  const expectedAfterFirstListReceive = {
    ...expectedDefaultInitialState,
    items: {
      [firstTransaction.id]: firstTransaction
    },
    itemIds: [firstTransaction.id],
    lastUpdated: 1317416400000
  }
  const expectedAfterFirstItemCreate = {
    ...expectedAfterFirstListReceive,
    lastUpdated: undefined
  }

  deepFreeze(expectedAfterFirstListReceive)
  deepFreeze(expectedAfterFirstItemCreate)

  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).toEqual(expectedDefaultInitialState)
  })

  it('should handle RECEIVE_TRANSACTION_LIST', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_TRANSACTION_LIST,
        transactions: [firstTransaction],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)

    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_TRANSACTION_LIST,
        transactions: [secondTransaction],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstTransaction.id]: firstTransaction,
        [secondTransaction.id]: secondTransaction
      },
      itemIds: [firstTransaction.id, secondTransaction.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  })

  it('should handle RECEIVE_TRANSACTION_LIST with duplicates', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_TRANSACTION_LIST,
        transactions: [firstTransaction],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)
  })

  it('should handle RECEIVE_TRANSACTION_CREATE', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_TRANSACTION_CREATE,
        transaction: firstTransaction,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)

    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_TRANSACTION_CREATE,
        transaction: secondTransaction,
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstTransaction.id]: firstTransaction,
        [secondTransaction.id]: secondTransaction
      },
      itemIds: [firstTransaction.id, secondTransaction.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    })
  })

  it('should handle RECEIVE_TRANSACTION_CREATE with duplicates', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_TRANSACTION_CREATE,
        transaction: firstTransaction,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)
  })

  it('should handle LOGOUT_SUCCESS and return initial state', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.LOGOUT_SUCCESS
      })
    ).toEqual(expectedDefaultInitialState)
  })
})
