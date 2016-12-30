import React from 'react';
import ReactDOM from 'react-dom';
import { CategoryView } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const category = {
    id: 1,
    name: 'Fast Food'
  }
  const div = document.createElement('div');
  ReactDOM.render(<CategoryView category={category}
                                dispatch={store.dispatch} />, div);
});
