import React from 'react';
import ReactDOM from 'react-dom';
import Category from './Category';

it('renders without crashing', () => {
  const category = {
    id: 1,
    name: 'Fast Food'
  }
  const div = document.createElement('div');
  ReactDOM.render(<Category category={category} />, div);
});
