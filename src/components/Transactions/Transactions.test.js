import React from 'react';
import ReactDOM from 'react-dom';
import Transactions from './Transactions';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Transactions />, div);
});
