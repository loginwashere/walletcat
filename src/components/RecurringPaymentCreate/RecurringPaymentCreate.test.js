import React from 'react';
import ReactDOM from 'react-dom';
import RecurringPaymentCreate from './RecurringPaymentCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecurringPaymentCreate />, div);
});
