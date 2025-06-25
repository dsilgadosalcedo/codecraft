import { useRef } from 'react'

import { exportGist } from '@/lib/api/gist'
import { exportZip, importZip } from '@/lib/api/zip'

import { useWorkspaces } from '../workspace/use-workspaces'

export function useImportExport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const {
    workspaces,
    currentWorkspaceId,
    createWorkspace,
    updateWorkspaceFiles,
  } = useWorkspaces()
  const currentWorkspace = workspaces.find(ws => ws.id === currentWorkspaceId)

  const exportZipHandler = async () => {
    if (!currentWorkspace) return
    await exportZip(currentWorkspace.name, {
      html: currentWorkspace.html,
      css: currentWorkspace.css,
      js: currentWorkspace.js,
    })
  }

  const exportGistHandler = async () => {
    if (!currentWorkspace) return
    const token = prompt('GitHub token for Gist export')
    if (!token) return
    try {
      const url = await exportGist(
        token,
        `CodeCraft2 Workspace: ${currentWorkspace.name}`,
        {
          html: currentWorkspace.html,
          css: currentWorkspace.css,
          js: currentWorkspace.js,
        }
      )
      window.open(url, '_blank')
    } catch {
      alert('Error creating gist')
    }
  }

  const importZipHandler = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const { html, css, js } = await importZip(file)
      createWorkspace('Imported Workspace')
      updateWorkspaceFiles({ html, css, js })
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch {
      alert('Invalid ZIP file')
    }
  }

  return {
    currentWorkspace,
    fileInputRef,
    exportZipHandler,
    exportGistHandler,
    importZipHandler,
  }
}

// Expose the hook's return type for UI props
export type ImportExportResult = ReturnType<typeof useImportExport>
