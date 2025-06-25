import { render } from '@testing-library/react'
import React from 'react'
import { describe, expect, it } from 'vitest'

import Preview from './preview'

describe('Preview', () => {
  it('renders an iframe with the given code', () => {
    const code = '<div>Hello World</div>'
    const { container } = render(<Preview code={code} />)
    const iframe = container.querySelector('iframe')
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute('srcDoc', code)
    expect(container).toMatchSnapshot()
  })
})
