import deepFreeze from 'deep-freeze'
import { v4 } from 'uuid'
import reducer, {
  initialState as expectedDefaultInitialState
} from '../userCurrencies'
import * as actions from '../../actions'

describe('userCurrencies reducer', () => {
  const firstUserCurrency = { id: v4(), currencyId: v4() }
  const secondUserCurrency = { id: v4(), currencyId: v4() }
  const initialState = undefined
  const expectedAfterFirstListReceive = {
    ...expectedDefaultInitialState,
    items: {
      [firstUserCurrency.id]: firstUserCurrency
    },
    itemIds: [firstUserCurrency.id],
    itemsByCurrencyId: {
      [firstUserCurrency.currencyId]: firstUserCurrency.id
    },
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

  it('should handle RECEIVE_USER_CURRENCY_LIST', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_USER_CURRENCY_LIST,
        userCurrencies: [firstUserCurrency],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)

    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_USER_CURRENCY_LIST,
        userCurrencies: [secondUserCurrency],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstUserCurrency.id]: firstUserCurrency,
        [secondUserCurrency.id]: secondUserCurrency
      },
      itemIds: [firstUserCurrency.id, secondUserCurrency.id],
      itemsByCurrencyId: {
        [firstUserCurrency.currencyId]: firstUserCurrency.id,
        [secondUserCurrency.currencyId]: secondUserCurrency.id
      },
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  })

  it('should handle RECEIVE_USER_CURRENCY_LIST with duplicates', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_USER_CURRENCY_LIST,
        userCurrencies: [firstUserCurrency],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)
  })

  it('should handle RECEIVE_ADD_USER_CURRENCY', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_ADD_USER_CURRENCY,
        userCurrency: firstUserCurrency,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)

    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_ADD_USER_CURRENCY,
        userCurrency: secondUserCurrency,
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstUserCurrency.id]: firstUserCurrency,
        [secondUserCurrency.id]: secondUserCurrency
      },
      itemIds: [firstUserCurrency.id, secondUserCurrency.id],
      itemsByCurrencyId: {
        [firstUserCurrency.currencyId]: firstUserCurrency.id,
        [secondUserCurrency.currencyId]: secondUserCurrency.id
      },
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    })
  })

  it('should handle RECEIVE_ADD_USER_CURRENCY with duplicates', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_ADD_USER_CURRENCY,
        userCurrency: firstUserCurrency,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)
  })

  it('should handle RECEIVE_REMOVE_USER_CURRENCY', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_REMOVE_USER_CURRENCY,
        userCurrency: firstUserCurrency,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedDefaultInitialState)
  })

  it('should handle LOGOUT_SUCCESS and return initial state', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.LOGOUT_SUCCESS
      })
    ).toEqual(expectedDefaultInitialState)
  })
})
