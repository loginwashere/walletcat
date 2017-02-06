import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import renderer from 'react-test-renderer'
import { Register } from '.'

it('renders without crashing', () => {
  const store = configureStore()
  const tree = renderer.create(
    <Provider store={store}>
      <Register dispatch={store.dispatch} />
    </Provider>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})
