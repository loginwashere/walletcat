import React from 'react';
import ReactDOM from 'react-dom';
import { Categories } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const categories = {
    '1': {
      id: 1,
      name: 'test'
    }
  };
  const categoryIds = [1]
  const div = document.createElement('div');
  ReactDOM.render(<Categories dispatch={store.dispatch}
                              categories={categories}
                              categoryIds={categoryIds} />, div);
});
