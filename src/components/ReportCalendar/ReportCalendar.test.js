import React from 'react';
import ReactDOM from 'react-dom';
import ReportCalendar from './ReportCalendar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ReportCalendar />, div);
});
