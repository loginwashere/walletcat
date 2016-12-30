import React from 'react';
import ReactDOM from 'react-dom';
import { AppAlertList } from '.';
import store from '../../store';

it('renders without crashing', () => {
  const items = [
    {
      id: 1,
      message: 'test'
    }
  ];
  const div = document.createElement('div');
  ReactDOM.render(<AppAlertList dispatch={store.dispatch}
                                items={items} />, div);
});