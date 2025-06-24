import React from 'react'
import { useWorkspaceStore } from '../store/useWorkspaceStore'
import JSZip from 'jszip'
import { Button } from '@/components/ui/button'

function WorkspaceSidebar() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(state => state.currentWorkspaceId)
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)
  const renameWorkspace = useWorkspaceStore(state => state.renameWorkspace)
  const deleteWorkspace = useWorkspaceStore(state => state.deleteWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(state => state.updateWorkspaceFiles)
  const currentWorkspace = workspaces.find(ws => ws.id === currentWorkspaceId) || { id: '', name: '', html: '', css: '', js: '' }

  return (
    <div className="w-64 bg-gray-800 text-white p-4 space-y-2">
      <h2 className="text-lg font-bold">Workspaces</h2>
      <ul>
        {workspaces.map(ws => (
          <li
            key={ws.id}
            className={`flex justify-between items-center p-2 rounded ${ws.id === currentWorkspaceId ? 'bg-gray-700' : 'hover:bg-gray-700 cursor-pointer'}`}
          >
            <span onClick={() => switchWorkspace(ws.id)}>{ws.name}</span>
            <div className="flex space-x-1">
              <button
                onClick={() => {
                  const newName = prompt('New name', ws.name)
                  if (newName) renameWorkspace(ws.id, newName)
                }}
                className="text-sm"
              >✏️</button>
              <button
                onClick={() => {
                  if (confirm('Delete this workspace?')) deleteWorkspace(ws.id)
                }}
                className="text-sm"
              >🗑️</button>
            </div>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          const name = prompt('Workspace name')
          if (name) createWorkspace(name)
        }}
        className="mt-2 w-full"
      >
        + New Workspace
      </Button>
      <Button
        onClick={async () => {
          const zip = new JSZip()
          zip.file('index.html', currentWorkspace.html)
          zip.file('style.css', currentWorkspace.css)
          zip.file('script.js', currentWorkspace.js)
          const blob = await zip.generateAsync({ type: 'blob' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = `${currentWorkspace.name || 'workspace'}.zip`
          a.click()
          URL.revokeObjectURL(url)
        }}
        className="mt-2 w-full"
        variant="secondary"
      >
        Export ZIP
      </Button>
      <Button
        onClick={async () => {
          const token = prompt('GitHub token for Gist export')
          if (!token) return
          try {
            const res = await fetch('https://api.github.com/gists', {
              method: 'POST',
              headers: { Authorization: `token ${token}`, 'Content-Type': 'application/json' },
              body: JSON.stringify({
                description: `CodeCraft2 Workspace: ${currentWorkspace.name}`,
                public: false,
                files: {
                  'index.html': { content: currentWorkspace.html },
                  'style.css': { content: currentWorkspace.css },
                  'script.js': { content: currentWorkspace.js },
                },
              }),
            })
            const data = await res.json()
            if (data.html_url) {
              window.open(data.html_url, '_blank')
            } else {
              alert('Failed to create gist')
            }
          } catch {
            alert('Error creating gist')
          }
        }}
        className="mt-2 w-full"
        variant="secondary"
      >
        Export Gist
      </Button>
      <input
        type="file"
        accept=".zip"
        onChange={async e => {
          const file = e.target.files?.[0]
          if (!file) return
          try {
            const zip = await JSZip.loadAsync(file)
            const html = await (zip.file('index.html')?.async('string') ?? Promise.resolve(''))
            const css = await (zip.file('style.css')?.async('string') ?? Promise.resolve(''))
            const js = await (zip.file('script.js')?.async('string') ?? Promise.resolve(''))
            createWorkspace('Imported Workspace')
            updateWorkspaceFiles({ html, css, js })
          } catch {
            alert('Invalid ZIP file')
          }
        }}
        className="mt-2 w-full text-white py-1 rounded border border-gray-600"
      />
    </div>
  )
}

export default WorkspaceSidebar 