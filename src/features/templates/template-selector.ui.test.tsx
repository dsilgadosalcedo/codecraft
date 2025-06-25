import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { describe, expect, it, vi } from 'vitest'

import type { Template } from './built-in-templates'
import TemplateSelectorUI from './template-selector.ui'

describe('TemplateSelectorUI', () => {
  const templates: Template[] = [
    {
      name: 'One',
      description: 'Desc for One',
      icon: <span>Icon1</span>,
      category: 'Cat1',
      isCustom: false,
      files: { html: '', css: '', js: '' },
    },
    {
      name: 'Two',
      description: '',
      icon: <span>Icon2</span>,
      category: undefined,
      isCustom: false,
      files: { html: '', css: '', js: '' },
    },
  ]

  it('renders trigger and opens dialog with templates', () => {
    const onSaveCustom = vi.fn()
    const onSelect = vi.fn()
    render(
      <TemplateSelectorUI
        templates={templates}
        onSaveCustom={onSaveCustom}
        onSelect={onSelect}
      />
    )
    // Trigger the dialog
    const trigger = screen.getByText('Templates')
    fireEvent.click(trigger)

    // Now the dialog content should be visible
    expect(screen.getByText('Select Template')).toBeInTheDocument()
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Desc for One')).toBeInTheDocument()
    expect(screen.getByText('Two')).toBeInTheDocument()
    // Snapshot of container
    expect(document.body).toMatchSnapshot()
  })

  it('calls onSelect when a template is clicked', () => {
    const onSaveCustom = vi.fn()
    const onSelect = vi.fn()
    render(
      <TemplateSelectorUI
        templates={templates}
        onSaveCustom={onSaveCustom}
        onSelect={onSelect}
      />
    )
    fireEvent.click(screen.getByText('Templates'))
    fireEvent.click(screen.getByText('One'))
    expect(onSelect).toHaveBeenCalledWith(templates[0])
  })

  it('calls onSaveCustom when save button clicked', () => {
    const onSaveCustom = vi.fn()
    const onSelect = vi.fn()
    render(
      <TemplateSelectorUI
        templates={templates}
        onSaveCustom={onSaveCustom}
        onSelect={onSelect}
      />
    )
    fireEvent.click(screen.getByText('Templates'))
    fireEvent.click(screen.getByText('Save Current as Template'))
    expect(onSaveCustom).toHaveBeenCalled()
  })
})
