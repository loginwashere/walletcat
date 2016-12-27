import React from 'react';
import ReactDOM from 'react-dom';
import { Transactions } from './Transactions';
import store from '../../store';

it('renders without crashing', () => {
  const transactions = [];
  const accounts = [];
  const categories = [];
  const div = document.createElement('div');
  ReactDOM.render(<Transactions transactions={transactions}
                                accounts={accounts}
                                categories={categories}
                                dispatch={store.dispatch} />, div);
});
