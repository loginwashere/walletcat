import deepFreeze from 'deep-freeze'
import { v4 } from 'uuid'
import reducer, {
  initialState as expectedDefaultInitialState
} from '../categories'
import * as actions from '../../actions'

describe('categories reducer', () => {
  const firstCategory = { id: v4(), name: 'Fast Food' }
  const secondCategory = { id: v4(), name: 'Transaport' }
  const initialState = undefined
  const expectedAfterFirstListReceive = {
    ...expectedDefaultInitialState,
    items: {
      [firstCategory.id]: firstCategory
    },
    itemIds: [firstCategory.id],
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

  it('should handle RECEIVE_CATEGORY_LIST', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_CATEGORY_LIST,
        categories: [firstCategory],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)

    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_CATEGORY_LIST,
        categories: [secondCategory],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstCategory.id]: firstCategory,
        [secondCategory.id]: secondCategory
      },
      itemIds: [firstCategory.id, secondCategory.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  })

  it('should handle RECEIVE_CATEGORY_LIST with duplicates', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_CATEGORY_LIST,
        categories: [firstCategory],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)
  })

  it('should handle RECEIVE_CATEGORY_CREATE', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_CATEGORY_CREATE,
        category: firstCategory,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)

    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_CATEGORY_CREATE,
        category: secondCategory,
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstCategory.id]: firstCategory,
        [secondCategory.id]: secondCategory
      },
      itemIds: [firstCategory.id, secondCategory.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    })
  })

  it('should handle RECEIVE_CATEGORY_CREATE with duplicates', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_CATEGORY_CREATE,
        category: firstCategory,
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
