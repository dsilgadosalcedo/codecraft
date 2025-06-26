import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { SidebarProvider } from '@/components/ui/sidebar'

import ShareDialog from './share-dialog'

describe('ShareDialog', () => {
  const currentWorkspace = {
    name: 'Demo Workspace',
    html: '<p>Hello</p>',
    css: 'body { background: white; }',
    js: 'console.log("Hello");',
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the trigger button', () => {
    render(
      <SidebarProvider>
        <ShareDialog currentWorkspace={currentWorkspace} />
      </SidebarProvider>
    )
    expect(screen.getByRole('button', { name: /Share/i })).toBeInTheDocument()
  })

  it('opens the dialog and displays share URL', async () => {
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <ShareDialog currentWorkspace={currentWorkspace} />
      </SidebarProvider>
    )
    await user.click(screen.getByRole('button', { name: /Share/i }))
    expect(screen.getByText('Share Workspace')).toBeInTheDocument()
    const textarea = screen.getByLabelText('Share URL') as HTMLTextAreaElement
    expect(textarea.value).toContain('share=')
    expect(textarea).toBeInTheDocument()
  })

  it('copies the URL to clipboard and shows confirmation', async () => {
    // Spy on the existing clipboard.writeText method
    const writeTextMock = vi
      .spyOn(navigator.clipboard, 'writeText')
      .mockResolvedValue(undefined)
    const user = userEvent.setup()
    render(
      <SidebarProvider>
        <ShareDialog currentWorkspace={currentWorkspace} />
      </SidebarProvider>
    )
    await user.click(screen.getByRole('button', { name: /Share/i }))
    const copyButton = screen.getByRole('button', { name: /Copy Link/i })
    await user.click(copyButton)
    expect(writeTextMock).toHaveBeenCalledWith(
      expect.stringContaining('share=')
    )
    expect(screen.getByText(/Copied!/i)).toBeInTheDocument()
  })
})
