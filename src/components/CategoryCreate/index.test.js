import React from 'react'
import renderer from 'react-test-renderer'
import CategoryCreate from '.'
import configureStore from '../../configureStore'
import { Provider } from 'react-redux'

it('renders without crashing', () => {
  const store = configureStore()
  const tree = renderer.create(
    <Provider store={store} >
      <CategoryCreate dispatch={store.dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
