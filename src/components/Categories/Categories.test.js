import React from 'react';
import ReactDOM from 'react-dom';
import { Categories } from './Categories';
import store from '../../store';

it('renders without crashing', () => {
  const categories = [];
  const div = document.createElement('div');
  ReactDOM.render(<Categories dispatch={store.dispatch}
                              categories={categories} />, div);
});
