import React from 'react';
import ReactDOM from 'react-dom';
import { Transactions } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const transactions = {};
  const transactionIds = []
  const accounts = {};
  const categories = {};
  const currencies = {};
  const userCurrencies = {};
  const div = document.createElement('div');
  ReactDOM.render(<Transactions transactions={transactions}
                                transactionIds={transactionIds}
                                accounts={accounts}
                                categories={categories}
                                currencies={currencies}
                                userCurrencies={userCurrencies}
                                dispatch={store.dispatch} />, div);
});
