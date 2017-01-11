import deepFreeze from 'deep-freeze';
import { v4 } from 'uuid';
import reducer, {
  initialState as expectedDefaultInitialState
} from '../accounts';
import * as actions from '../../actions';

describe('accounts reducer', () => {
  const firstAccount = {id: v4(), name: 'Wallet'};
  const secondAccount = {id: v4(), name: 'Stash'};
  const initialState = undefined;
  const expectedAfterFirstListReceive = {
    ...expectedDefaultInitialState,
    items: {
      [firstAccount.id]: firstAccount
    },
    itemIds: [firstAccount.id],
    lastUpdated: 1317416400000
  };
  const expectedAfterFirstItemCreate = {
    ...expectedAfterFirstListReceive,
    lastUpdated: undefined
  };

  deepFreeze(expectedAfterFirstListReceive);
  deepFreeze(expectedAfterFirstItemCreate);

  it('should return the initial state', () => {
    expect(
      reducer(initialState, {})
    ).toEqual(expectedDefaultInitialState)
  });

  it('should handle RECEIVE_ACCOUNT_LIST', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [firstAccount],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)

    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [secondAccount],
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstAccount.id]: firstAccount,
        [secondAccount.id]: secondAccount
      },
      itemIds: [firstAccount.id, secondAccount.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: 1317416400001
    })
  });

  it('should handle RECEIVE_ACCOUNT_LIST with duplicates', () => {
    expect(
      reducer(expectedAfterFirstListReceive, {
        type: actions.RECEIVE_ACCOUNT_LIST,
        accounts: [firstAccount],
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstListReceive)
  });

  it('should handle RECEIVE_ACCOUNT_CREATE', () => {
    expect(
      reducer(initialState, {
        type: actions.RECEIVE_ACCOUNT_CREATE,
        account: firstAccount,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)

    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_ACCOUNT_CREATE,
        account: secondAccount,
        receivedAt: 1317416400001,
      })
    ).toEqual({
      items: {
        [firstAccount.id]: firstAccount,
        [secondAccount.id]: secondAccount
      },
      itemIds: [firstAccount.id, secondAccount.id],
      didInvalidate: false,
      isFetching: false,
      lastUpdated: undefined
    })
  });

  it('should handle RECEIVE_ACCOUNT_CREATE with duplicates', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.RECEIVE_ACCOUNT_CREATE,
        account: firstAccount,
        receivedAt: 1317416400000,
      })
    ).toEqual(expectedAfterFirstItemCreate)
  });

  it('should handle LOGOUT_SUCCESS and return initial state', () => {
    expect(
      reducer(expectedAfterFirstItemCreate, {
        type: actions.LOGOUT_SUCCESS
      })
    ).toEqual(expectedDefaultInitialState)
  });
});
