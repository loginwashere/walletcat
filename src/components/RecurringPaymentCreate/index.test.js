import React from 'react'
import ReactDOM from 'react-dom'
import { RecurringPaymentCreate } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const div = document.createElement('div')
  ReactDOM.render(<RecurringPaymentCreate dispatch={store.dispatch} />, div)
})
