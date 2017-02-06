import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import AccountEditForm from '.'
import { accountSeeder } from '../../../server/seeds'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  ReactDOM.render(
    <Provider store={store}>
      <AccountEditForm account={accountSeeder.items[0]} />
    </Provider>,
    div
  )
})

