import { render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import Preview from './preview'

describe('Preview component', () => {
  it('renders an iframe with the provided code', () => {
    const code = '<h1>Hello</h1>'
    render(<Preview code={code} />)
    const iframe = screen.getByTitle('Preview')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('srcDoc', code)
  })

  it('matches snapshot', () => {
    const { asFragment } = render(<Preview code="<div>Test</div>" />)
    expect(asFragment()).toMatchSnapshot()
  })
})
