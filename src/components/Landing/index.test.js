import React from 'react'
import ReactDOM from 'react-dom'
import { Landing } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  const isAuthenticated = false
  ReactDOM.render(<Landing dispatch={store.dispatch}
                           isAuthenticated={isAuthenticated} />, div)
})
