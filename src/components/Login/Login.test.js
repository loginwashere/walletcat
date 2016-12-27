import React from 'react';
import ReactDOM from 'react-dom';
import { Login } from './Login';
import store from '../../store';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Login dispatch={store.dispatch}/>, div);
});
