import React from 'react'
import ReactDOM from 'react-dom'
import { AccountView } from '.'
import configureStore from '../../configureStore'
import { accountSeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const div = document.createElement('div')
  const store = configureStore()
  ReactDOM.render(<AccountView dispatch={store.dispatch}
                               accountId={accountSeeder.items[0].id} />, div)
})
