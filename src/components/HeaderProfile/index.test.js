import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import HeaderProfile from '.'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const user = {
    id: v4(),
    username: 'test',
    avatar: ''
  }
  ReactDOM.render(<HeaderProfile user={user} eventKey={1} />, div)
})
