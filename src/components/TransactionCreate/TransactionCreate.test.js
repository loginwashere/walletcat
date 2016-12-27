import React from 'react';
import ReactDOM from 'react-dom';
import TransactionCreate from './TransactionCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TransactionCreate />, div);
});