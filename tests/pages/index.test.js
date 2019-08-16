/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import Index from '../../pages'

it('Index renders correctly', () => {
  const component = renderer.create(<Index />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
