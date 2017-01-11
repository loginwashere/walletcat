// TODO find way to fix test

// import React from 'react';
// import ReactDOM from 'react-dom';
// import { v4 } from 'uuid';
// import { AccountCreateForm } from '.';
// import configureStore from '../../configureStore';

// it('renders without crashing', () => {
//   const store = configureStore();
//   const div = document.createElement('div');
//   const currency = {
//     id: v4(),
//     name: 'USD'
//   };
//   const currencies = {
//     [currency.id]: currency
//   };
//   const userCurrency = {
//     id: v4(),
//     currencyId: currency.id,
//     userId: v4()
//   };
//   const userCurrencies = {
//    [userCurrency.id]: userCurrency
//   };
//   const userCurrencyIds = [userCurrency.id];
//   ReactDOM.render(<AccountCreateForm currencies={currencies}
//                                      userCurrencies={userCurrencies}
//                                      userCurrencyIds={userCurrencyIds}
//                                      dispatch={store.dispatch} />, div);
// });