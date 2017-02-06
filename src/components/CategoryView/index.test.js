import React from 'react'
import { CategoryView } from '.'
import configureStore from '../../configureStore'
import renderer from 'react-test-renderer'
import { Provider } from 'react-redux'
import { categorySeeder } from '../../../server/seeds'

it('renders without crashing', () => {
  const store = configureStore()
  const category = categorySeeder.items[0]
  const tree = renderer.create(
    <Provider store={store} >
      <CategoryView category={category}
                    categoryId={category.id}
                    dispatch={store.dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
