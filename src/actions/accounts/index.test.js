import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import sinon from 'sinon';
import thunk from 'redux-thunk';
import { v4 } from 'uuid';
import * as actions from '.';
import * as types from '.';

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('actions', () => {
  it('should create an action to invalidate account', () => {
    const expectedAction = {
      type: types.INVALIDATE_ACCOUNT_LIST
    };
    expect(actions.invalidateAccounts()).toEqual(expectedAction);
  });
});

describe('async actions', () => {
  let fakeTime = new Date(2011,9,1).getTime();
  let clock;

  beforeEach(function () {
    clock = sinon.useFakeTimers(fakeTime);
    moxios.install();
  });

  afterEach(function () {
    clock.restore();
    moxios.uninstall()
  });

  it('creates RECEIVE_ACCOUNT_LIST when fetching accounts has been done', () => {
    const accountId = v4();
    moxios.stubRequest(/.*api\/accounts.*/, {
      status: 200,
      response: { accounts: [{id: accountId, name: 'Wallet'}] }
    })

    const expectedActions = [
      { type: types.REQUEST_ACCOUNT_LIST },
      {
        type: types.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: accountId, name: 'Wallet'}],
        receivedAt: 1317416400000,
      }
    ];
    const store = mockStore({ accounts: { items: {}, itemIds: [] } });

    return store.dispatch(actions.fetchAccountsIfNeeded())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
