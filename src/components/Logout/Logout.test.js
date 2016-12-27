import React from 'react';
import ReactDOM from 'react-dom';
import Logout from './Logout';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Logout dispatch={store.dispatch} />, div);
});
