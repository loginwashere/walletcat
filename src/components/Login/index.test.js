import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'
import renderer from 'react-test-renderer'
import { Login } from '.'

describe('components:Login:', () => {
  it('renders without crashing', () => {
    const store = configureStore()
    const tree = renderer.create(
      <Provider store={store}>
        <Login dispatch={store.dispatch} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
