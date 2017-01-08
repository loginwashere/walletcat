import {
  INVALIDATE_ACCOUNT_LIST,
  REQUEST_ACCOUNT_LIST,
  RECEIVE_ACCOUNT_LIST,
  ACCOUNT_CREATE_REQUEST,
  ACCOUNT_CREATE_RECEIVE
} from '../actions';

export default function accounts(state = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
  lastUpdated: undefined
}, action) {
  switch (action.type) {
    case INVALIDATE_ACCOUNT_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_ACCOUNT_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_ACCOUNT_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.accounts
            .reduce((obj, item) => ({...obj, [item.id]: item}), {})
        },
        itemIds: [
          ...state.itemIds,
          ...action.accounts
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
        lastUpdated: action.receivedAt
      };
    case ACCOUNT_CREATE_REQUEST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case ACCOUNT_CREATE_RECEIVE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.account.id]: action.account
        },
        itemIds: [
          ...state.itemIds,
          ...[action.account]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ]
      }
    default:
      return state
  }
}
