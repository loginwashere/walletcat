import React from 'react';
import ReactDOM from 'react-dom';
import AppAlert from './AppAlert';
import store from '../../store';

it('renders without crashing', () => {
  const alert = {
    message: 'test',
    description: 'trest'
  }
  const div = document.createElement('div');
  ReactDOM.render(<AppAlert alert={alert}
                            dispatch={store.dispatch}/>, div);
});
