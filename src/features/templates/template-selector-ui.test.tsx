import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SidebarProvider } from '@/components/ui/sidebar'

import type { Template } from './built-in-templates'
import TemplateSelectorUI from './template-selector.ui'

describe('TemplateSelectorUI', () => {
  const templates: Template[] = [
    {
      name: 'One',
      files: { html: '', css: '', js: '' },
      icon: <div>icon</div>,
    },
    {
      name: 'Two',
      description: 'desc',
      category: 'cat',
      files: { html: '', css: '', js: '' },
      icon: <span>ic</span>,
    },
  ]

  const onSelect = vi.fn()
  const onSaveCustom = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('displays the trigger button', () => {
    render(
      <SidebarProvider>
        <TemplateSelectorUI
          templates={templates}
          onSelect={onSelect}
          onSaveCustom={onSaveCustom}
        />
      </SidebarProvider>
    )
    expect(screen.getByText(/Templates/i)).toBeInTheDocument()
  })

  it('opens dialog and shows templates on trigger click', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <TemplateSelectorUI
          templates={templates}
          onSelect={onSelect}
          onSaveCustom={onSaveCustom}
        />
      </SidebarProvider>
    )
    await user.click(screen.getByText(/Templates/i))
    expect(screen.getByText('Select Template')).toBeInTheDocument()
    templates.forEach(t => {
      expect(screen.getByText(t.name)).toBeInTheDocument()
    })
  })
})
