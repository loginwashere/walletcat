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
    const initialState = undefined;
    const expectedAfterFirstState = {
      items: {
        [accountId]: {id: accountId, name: 'Wallet'}
      },
      itemIds: [accountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400000
    };

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

  it('should handle RECEIVE_ACCOUNT_LIST with duplicates', () => {
    const accountId = v4();
    const expectedAfterFirstState = {
      items: {
        [accountId]: {id: accountId, name: 'Wallet'}
      },
      itemIds: [accountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400000
    };

    deepFreeze(expectedAfterFirstState);

    expect(
      reducer(expectedAfterFirstState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: accountId, name: 'Wallet'}],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstState)
  });

  it('should handle ACCOUNT_CREATE_RECEIVE', () => {
    const accountId = v4();
    const secondAccountId = v4();
    const initialState = undefined;
    const expectedAfterFirstState = {
      items: {
        [accountId]: {id: accountId, name: 'Wallet'}
      },
      itemIds: [accountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    };

    deepFreeze(expectedAfterFirstState);

    expect(
      reducer(initialState, {
        type: actions.ACCOUNT_CREATE_RECEIVE,
        account: {id: accountId, name: 'Wallet'},
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstState)

    expect(
      reducer(expectedAfterFirstState, {
        type: actions.ACCOUNT_CREATE_RECEIVE,
        account: {id: secondAccountId, name: 'Stash'},
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
      lastUpdated: undefined
    })
  });

  it('should handle ACCOUNT_CREATE_RECEIVE with duplicates', () => {
    const accountId = v4();
    const expectedAfterFirstState = {
      items: {
        [accountId]: {id: accountId, name: 'Wallet'}
      },
      itemIds: [accountId],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    };

    deepFreeze(expectedAfterFirstState);

    expect(
      reducer(expectedAfterFirstState, {
        type: actions.ACCOUNT_CREATE_RECEIVE,
        account: {id: accountId, name: 'Wallet'},
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstState)
  });
});
