import React from 'react';
import ReactDOM from 'react-dom';
import Blotter from './Blotter';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Blotter />, div);
});
