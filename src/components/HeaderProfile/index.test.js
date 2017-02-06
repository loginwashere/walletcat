import React from 'react'
import ReactDOM from 'react-dom'
import HeaderProfile from '.'
import configureStore from '../../configureStore'
import { userSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  const user = userSeeder.items[0]
  ReactDOM.render(<HeaderProfile user={user}
                                 eventKey={1}
                                 dispatch={store.dispatch} />, div)
})
