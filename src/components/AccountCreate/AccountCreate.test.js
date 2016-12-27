import React from 'react';
import ReactDOM from 'react-dom';
import AccountCreate from './AccountCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AccountCreate />, div);
});