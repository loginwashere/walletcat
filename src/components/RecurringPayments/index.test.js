import React from 'react';
import ReactDOM from 'react-dom';
import RecurringPayments from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RecurringPayments />, div);
});
