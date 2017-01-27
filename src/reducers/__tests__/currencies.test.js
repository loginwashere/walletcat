import deepFreeze from 'deep-freeze'
import { v4 } from 'uuid'
import reducer, {
  initialState as expectedDefaultInitialState
} from '../currencies'
import * as actions from '../../actions'

describe('currecnes reducer', () => {
  const firstCurrency = { id: v4(), name: 'USD' }
  const secondCurrency = { id: v4(), name: 'UAH' }
  const initialState = undefined
  const expectedAfterFirstListReceive = {
    ...expectedDefaultInitialState,
    items: {
      [firstCurrency.id]: firstCurrency
    },
    itemIds: [firstCurrency.id],
    lastUpdated: 1317416400000
  }

  deepFreeze(expectedAfterFirstListReceive)

  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).toEqual(expectedDefaultInitialState)
  })

  it('should handle RECEIVE_APP_CURRENCY_LIST', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_APP_CURRENCY_LIST,
        currencies: [firstCurrency],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)

    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_APP_CURRENCY_LIST,
        currencies: [secondCurrency],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstCurrency.id]: firstCurrency,
        [secondCurrency.id]: secondCurrency
      },
      itemIds: [firstCurrency.id, secondCurrency.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  })

  it('should handle RECEIVE_APP_CURRENCY_LIST with duplicates', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_APP_CURRENCY_LIST,
        currencies: [firstCurrency],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)
  })

  it('should handle LOGOUT_SUCCESS and return initial state', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.LOGOUT_SUCCESS
      })
    ).toEqual(expectedDefaultInitialState)
  })
})
