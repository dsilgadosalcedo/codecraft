import { fireEvent, render, screen } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { Workspace } from '@/types'

import NavProjectsUI from './nav-projects.ui'

describe('NavProjectsUI', () => {
  const workspace: Workspace = {
    id: '1',
    name: 'Test',
    html: '',
    css: '',
    js: '',
  }
  const fileInputRef = {
    current: { click: vi.fn() },
  } as unknown as React.RefObject<HTMLInputElement>
  const exportZipHandler = vi.fn()
  const exportGistHandler = vi.fn()
  const importZipHandler = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders import/export buttons', () => {
    render(
      <NavProjectsUI
        currentWorkspace={workspace}
        fileInputRef={fileInputRef}
        exportZipHandler={exportZipHandler}
        exportGistHandler={exportGistHandler}
        importZipHandler={importZipHandler}
      />
    )
    expect(screen.getByText('Export ZIP')).toBeInTheDocument()
    expect(screen.getByText('Export Gist')).toBeInTheDocument()
    expect(screen.getByText('Import ZIP')).toBeInTheDocument()
  })

  it('calls handlers on button click', () => {
    render(
      <NavProjectsUI
        currentWorkspace={workspace}
        fileInputRef={fileInputRef}
        exportZipHandler={exportZipHandler}
        exportGistHandler={exportGistHandler}
        importZipHandler={importZipHandler}
      />
    )
    fireEvent.click(screen.getByText('Export ZIP'))
    expect(exportZipHandler).toHaveBeenCalled()

    fireEvent.click(screen.getByText('Export Gist'))
    expect(exportGistHandler).toHaveBeenCalled()

    fireEvent.click(screen.getByText('Import ZIP'))
    expect(fileInputRef.current?.click).toHaveBeenCalled()
  })
})
