import React from 'react';
import ReactDOM from 'react-dom';
import { Categories } from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
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
