import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import AppCurrency from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');
  const currency = {
    id: v4(),
    name: 'test',
    description: 'trest'
  };
  ReactDOM.render(<AppCurrency currency={currency}
                               dispatch={store.dispatch} />, div);
});