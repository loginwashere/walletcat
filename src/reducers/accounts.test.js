import deepFreeze from 'deep-freeze';
import { v4 } from 'uuid';
import reducer from './accounts';
import * as actions from '../actions';

describe('accounts reducer', () => {
  it('should return the initial state', () => {
    expect(
      reducer(undefined, {})
    ).toEqual({
      items: {},
      itemIds: [],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    })
  });

  it('should handle RECEIVE_ACCOUNT_LIST', () => {
    const accountId = v4();
    const secondAccountId = v4();
    const initialState = {};
    const expectedAfterFirstState = {
      items: {
        [accountId]: {id: accountId, name: 'Wallet'}
      },
      itemIds: [accountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400000
    };

    deepFreeze(initialState);
    deepFreeze(expectedAfterFirstState);

    expect(
      reducer(initialState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: accountId, name: 'Wallet'}],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstState)

    expect(
      reducer(expectedAfterFirstState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: secondAccountId, name: 'Stash'}],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [accountId]: {id: accountId, name: 'Wallet'},
        [secondAccountId]: {id: secondAccountId, name: 'Stash'}
      },
      itemIds: [accountId, secondAccountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  });
});
