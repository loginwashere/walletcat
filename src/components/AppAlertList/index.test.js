import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import { AppAlertList } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const items = [
    {
      id: v4(),
      message: 'test'
    }
  ]
  const div = document.createElement('div')
  ReactDOM.render(<AppAlertList dispatch={store.dispatch}
                                items={items} />, div)
})
