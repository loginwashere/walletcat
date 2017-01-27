import React from 'react'
import ReactDOM from 'react-dom'
import ReportByCategory from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<ReportByCategory />, div)
})
