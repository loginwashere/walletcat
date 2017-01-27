import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import { CategoryView } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const category = {
    id: v4(),
    name: 'Fast Food'
  }
  const div = document.createElement('div')
  ReactDOM.render(<CategoryView category={category}
                                dispatch={store.dispatch} />, div)
})
