import React from 'react';
import ReactDOM from 'react-dom';
import { CategoryDelete } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const category = {
    id: 1,
    name: 'Category Name',
    description: 'Category Description'
  }
  const div = document.createElement('div');
  ReactDOM.render(<CategoryDelete category={category}
                                  dispatch={store.dispatch} />, div);
});
