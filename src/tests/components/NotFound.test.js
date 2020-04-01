import React from 'react'
import { render } from '../../../enzyme'

describe('NotFound component', () => {
  it('reners properly', () => {
    const wrapper = render(<NotFound />)
    expect(wrapper).toMatchSnapshot()
  })
})
