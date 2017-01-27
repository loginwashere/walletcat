import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import { Categories } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const category = {
    id: v4(),
    name: 'test'
  }
  const categories = {
    [category.id]: category
  }
  const categoryIds = [category.id]
  const div = document.createElement('div')
  ReactDOM.render(<Categories dispatch={store.dispatch}
                              categories={categories}
                              categoryIds={categoryIds} />, div)
})
