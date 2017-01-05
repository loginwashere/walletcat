import {
  INVALIDATE_USER_CURRENCY_LIST,
  REQUEST_USER_CURRENCY_LIST,
  RECEIVE_USER_CURRENCY_LIST,
  REQUEST_ADD_USER_CURRENCY,
  RECEIVE_ADD_USER_CURRENCY,
  REQUEST_REMOVE_USER_CURRENCY,
  RECEIVE_REMOVE_USER_CURRENCY
} from '../actions';

export default function userCurrencies(state = {
  isFetching: false,
  didInvalidate: false,
  items: {},
  itemIds: [],
  itemsByCurrencyId: {}
}, action) {
  let items = {}, itemsByCurrencyId = {}, newItems = {};
  switch (action.type) {
    case INVALIDATE_USER_CURRENCY_LIST:
      return {
        ...state,
        didInvalidate: true
      };
    case REQUEST_USER_CURRENCY_LIST:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_USER_CURRENCY_LIST:
      items = {};
      action.userCurrencies.forEach(item => items[item.id] = item);
      newItems = {
        ...state.items,
        ...items
      };
      Object.keys(newItems)
        .forEach(key => {
           newItems[key] && (itemsByCurrencyId[newItems[key].currencyId] = newItems[key].id)
        });
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        itemIds: Object.keys(newItems),
        itemsByCurrencyId: itemsByCurrencyId,
        lastUpdated: action.receivedAt
      };
    case REQUEST_ADD_USER_CURRENCY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_ADD_USER_CURRENCY:
      items = {};
      [action.userCurrency].forEach(item => items[item.id] = item);
      newItems = {
        ...state.items,
        ...items
      };
      Object.keys(newItems)
        .forEach(key => {
           newItems[key] && (itemsByCurrencyId[newItems[key].currencyId] = newItems[key].id)
        });
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: newItems,
        itemIds: Object.keys(newItems),
        itemsByCurrencyId: itemsByCurrencyId,
        lastUpdated: action.receivedAt
      };
    case REQUEST_REMOVE_USER_CURRENCY:
      return {
        ...state,
        isFetching: true,
        didInvalidate: false
      };
    case RECEIVE_REMOVE_USER_CURRENCY:
      let {[`${action.userCurrency.id}`]: omit, ...restItems} = state.items;
      console.log(restItems, state.items)
      Object.keys(restItems).forEach(key => {
           restItems[key] && (itemsByCurrencyId[restItems[key].currencyId] = restItems[key].id)
        });
      return {
        ...state,
        isFetching: false,
        didInvalidate: false,
        items: restItems,
        itemIds: Object.keys(restItems),
        itemsByCurrencyId: itemsByCurrencyId,
        lastUpdated: action.receivedAt
      };
    default:
      return state
  }
}
