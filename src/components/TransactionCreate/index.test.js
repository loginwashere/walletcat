import React from 'react'
import ReactDOM from 'react-dom'
import { TransactionCreate } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div')
  ReactDOM.render(<TransactionCreate dispatch={store.dispatch} />, div)
})
