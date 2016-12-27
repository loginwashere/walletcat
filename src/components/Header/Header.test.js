import React from 'react';
import ReactDOM from 'react-dom';
import { Header } from './Header';
import store from '../../store';

it('renders without crashing', () => {
  const user = {
    id: 1,
    username: 'admin',
    avatar: 'https://www.gravatar.com/avatar/edb0e96701c209ab4b50211c856c50c4?s=50'
  };
  const isAuthenticated = true;
  const div = document.createElement('div');
  ReactDOM.render(<Header user={user}
                          isAuthenticated={isAuthenticated}
                          dispatch={store.dispatch} />, div);
});
