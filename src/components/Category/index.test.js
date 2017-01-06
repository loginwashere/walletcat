import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import Category from '.';

it('renders without crashing', () => {
  const category = {
    id: v4(),
    name: 'Fast Food'
  }
  const div = document.createElement('div');
  ReactDOM.render(<Category category={category} />, div);
});
