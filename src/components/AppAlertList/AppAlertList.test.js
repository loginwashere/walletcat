import React from 'react';
import ReactDOM from 'react-dom';
import AppAlertList from './AppAlertList';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppAlertList />, div);
});