import React from 'react'
import renderer from 'react-test-renderer'
import { AccountDelete } from '.'
import { accountSeeder } from '../../../server/seeds'

describe('components:AccountDelete:', () => {
  const dispatch = jest.fn()
  const accountId = accountSeeder.items[0].id

  it('renders without crashing', () => {
    const tree = renderer.create(
      <AccountDelete dispatch={dispatch}
                     accountId={accountId} />
    ).toJSON()
    expect(tree).toMatchSnapshot()
    expect(dispatch.mock.calls.length).toBe(1)
  })
})
