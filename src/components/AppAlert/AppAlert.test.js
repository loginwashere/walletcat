import React from 'react';
import ReactDOM from 'react-dom';
import AppAlert from './AppAlert';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppAlert />, div);
});
