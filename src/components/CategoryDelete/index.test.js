import React from 'react'
import ReactDOM from 'react-dom'
import { v4 } from 'uuid'
import { CategoryDelete } from '.'
import configureStore from '../../configureStore'

it('renders without crashing', () => {
  const store = configureStore()
  const category = {
    id: v4(),
    name: 'Category Name',
    description: 'Category Description'
  }
  const div = document.createElement('div')
  ReactDOM.render(<CategoryDelete category={category}
                                  categoryId={category.id}
                                  dispatch={store.dispatch} />, div)
})
