import React from 'react';
import ReactDOM from 'react-dom';
import Logout from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const div = document.createElement('div');
  ReactDOM.render(<Logout dispatch={store.dispatch} eventKey={1} />, div);
});
