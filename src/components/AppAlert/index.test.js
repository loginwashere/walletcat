import React from 'react';
import ReactDOM from 'react-dom';
import AppAlert from '.';
import configureStore from '../../configureStore';

it('renders without crashing', () => {
  const store = configureStore();
  const alert = {
    message: 'test',
    description: 'trest'
  }
  const div = document.createElement('div');
  ReactDOM.render(<AppAlert alert={alert}
                            dispatch={store.dispatch}/>, div);
});
