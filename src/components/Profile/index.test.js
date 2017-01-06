import React from 'react';
import ReactDOM from 'react-dom';
import { v4 } from 'uuid';
import { Profile } from '.';

it('renders without crashing', () => {
  const user = {
    id: v4(),
    username: 'admin',
    email: 'admin@mail.com',
    avatar: 'https://www.gravatar.com/avatar/edb0e96701c209ab4b50211c856c50c4?s=50'
  };
  const div = document.createElement('div');
  ReactDOM.render(<Profile user={user} />, div);
});
