import deepFreeze from 'deep-freeze';
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
    const initialState = {};
    const expectedAfterFirstState = {
      items: {
        '1': {id: 1, name: 'Wallet'}
      },
      itemIds: ['1'],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400000
    };

    deepFreeze(initialState);
    deepFreeze(expectedAfterFirstState);

    expect(
      reducer(initialState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: 1, name: 'Wallet'}],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstState)

    expect(
      reducer(expectedAfterFirstState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [{id: 2, name: 'Stash'}],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        '1': {id: 1, name: 'Wallet'},
        '2': {id: 2, name: 'Stash'}
      },
      itemIds: ['1', '2'],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  });
});
