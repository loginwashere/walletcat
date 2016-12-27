import React from 'react';
import ReactDOM from 'react-dom';
import { RecurringPaymentCreate } from './RecurringPaymentCreate';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecurringPaymentCreate dispatch={store.dispatch} />, div);
});
