import React from 'react'
import renderer from 'react-test-renderer'
import { AgentCreate } from '.'
import { Provider } from 'react-redux'
import configureStore from '../../configureStore'

describe('components:AgentCreate:', () => {
  it('renders without crashing', () => {
    const dispatch = jest.fn()
    const store = configureStore()
    const currentPage = 1
    const tree = renderer.create(
      <Provider store={store}>
        <AgentCreate dispatch={dispatch}
                     currentPage={currentPage} />
      </Provider>
    ).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
