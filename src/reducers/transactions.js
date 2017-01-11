import {
  INVALIDATE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_LIST,
  RECEIVE_TRANSACTION_LIST,
  REQUEST_TRANSACTION_CREATE,
  RECEIVE_TRANSACTION_CREATE,
  LOGOUT_SUCCESS
} from '../actions';

export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: []
};

export default function transactions(state = initialState, action) {
  switch (action.type) {
    case INVALIDATE_TRANSACTION_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_TRANSACTION_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_TRANSACTION_LIST:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          ...action.transactions
            .reduce((obj, item) => ({...obj, [item.id]: item}), {})
        },
        itemIds: [
          ...state.itemIds,
          ...action.transactions
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ],
        lastUpdated: action.receivedAt
      };
    case REQUEST_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_TRANSACTION_CREATE:
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: {
          ...state.items,
          [action.transaction.id]: action.transaction
        },
        itemIds: [
          ...state.itemIds,
          ...[action.transaction]
            .map(item => item.id)
            .filter(id => state.itemIds.indexOf(id) === -1)
        ]
      };
    case LOGOUT_SUCCESS:
      return initialState;
    default:
      return state
  }
}
