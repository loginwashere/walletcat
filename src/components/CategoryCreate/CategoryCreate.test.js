import React from 'react';
import ReactDOM from 'react-dom';
import CategoryCreate from './CategoryCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CategoryCreate />, div);
});
