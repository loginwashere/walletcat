import React from 'react';
import ReactDOM from 'react-dom';
import { Accounts } from './Accounts';
import store from '../../store';

it('renders without crashing', () => {
  const accounts = [
    {
      id: 1,
      name: 'Wallet'
    }
  ];
  const div = document.createElement('div');
  ReactDOM.render(<Accounts accounts={accounts}
                            dispatch={store.dispatch} />, div);
});
