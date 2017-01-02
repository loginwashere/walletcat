import React from 'react';
import ReactDOM from 'react-dom';
import HeaderProfile from '.';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const user = {
    id: 1,
    username: 'test',
    avatar: ''
  }
  ReactDOM.render(<HeaderProfile user={user} eventKey={1} />, div);
});
