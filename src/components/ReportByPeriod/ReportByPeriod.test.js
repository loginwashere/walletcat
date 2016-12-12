import React from 'react';
import ReactDOM from 'react-dom';
import ReportByPeriod from './ReportByPeriod';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReportByPeriod />, div);
});
