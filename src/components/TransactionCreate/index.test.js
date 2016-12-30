import React from 'react';
import ReactDOM from 'react-dom';
import { TransactionCreate } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransactionCreate dispatch={store.dispatch} />, div);
});