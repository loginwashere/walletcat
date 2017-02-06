import React from 'react'
import ReactDOM from 'react-dom'
import { AccountDelete } from '.'
import configureStore from '../../configureStore'
import { accountSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  const accountId = accountSeeder.items[0].id
  ReactDOM.render(<AccountDelete dispatch={store.dispatch}
                                 accountId={accountId} />, div)
})
