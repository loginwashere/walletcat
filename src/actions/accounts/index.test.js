import configureMockStore from 'redux-mock-store'
import moxios from 'moxios'
import sinon from 'sinon'
import thunk from 'redux-thunk'
import { accountSeeder } from '../../../server/seeds'
import * as actions from '.'
import { accountsPaginator } from '../../reducers/accounts'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('actions', () => {
  it('should create an action to invalidate account', () => {
    const expectedAction = {
      type: actions.INVALIDATE_ACCOUNT_LIST
    }
    expect(actions.invalidateAccounts()).toEqual(expectedAction)
  })
})

describe('async actions', () => {
  const fakeTime = new Date(2011, 9, 1).getTime()
  let clock

  beforeEach(function() {
    clock = sinon.useFakeTimers(fakeTime)
    moxios.install()
  })

  afterEach(function() {
    clock.restore()
    moxios.uninstall()
  })

  it(`creates ${actions.REQUEST_ACCOUNT_LIST} when fetching accounts has been done`, () => {
    const account = accountSeeder.items[0]
    const page = accountsPaginator.DEFAULT_PAGE
    const limit = accountsPaginator.DEFAULT_LIMIT
    moxios.stubRequest(/.*api\/accounts.*/, {
      status: 200,
      response: { accounts: [account], meta: { page, limit, hasNext: false } }
    })

    const expectedActions = [
      { type: actions.REQUEST_ACCOUNT_LIST },
      {
        meta:  {
          endpoint: '/accounts/',
          resultKey: 'accounts',
        },
        payload:  {
          limit,
          page,
        },
        type: accountsPaginator.REQUEST_PAGE,
      },
      {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [account],
        receivedAt: 1317416400000,
      },
      {
        meta: {
          endpoint: '/accounts/',
          resultKey: 'accounts'
        },
        payload:  {
          hasNextPage: false,
          limit,
          page,
          results:  [account]
        },
        type: accountsPaginator.RECEIVE_PAGE,
      }
    ]
    const store = mockStore({
      accounts: { items: {}, itemIds: [] },
      pagination: {
        accounts: {
          pages: {}
        }
      }
    })

    return store.dispatch(actions.fetchAccountsIfNeeded({ page, limit }))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
