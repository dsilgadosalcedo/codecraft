import React from 'react'
import { useWorkspaceStore } from '../store/useWorkspaceStore'
import JSZip from 'jszip'
import { Button } from '@/components/ui/button'
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar'

function WorkspaceSidebar() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(state => state.currentWorkspaceId)
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(state => state.updateWorkspaceFiles)
  const currentWorkspace = workspaces.find(ws => ws.id === currentWorkspaceId) || { id: '', name: '', html: '', css: '', js: '' }

  return (
    
      <Sidebar collapsible="icon">
        <SidebarHeader className="flex justify-between items-center px-4 py-2">
          <span className="font-bold">Workspaces</span>
        </SidebarHeader>
        <SidebarContent className="flex-1 overflow-auto px-2 py-4 space-y-2">
          <SidebarMenu>
            {workspaces.map(ws => (
              <SidebarMenuItem key={ws.id}>
                <SidebarMenuButton
                  asChild
                  isActive={ws.id === currentWorkspaceId}
                  onClick={() => switchWorkspace(ws.id)}
                >
                  <span>{ws.name}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Button
            variant="ghost"
            className="w-full"
            onClick={() => {
              const name = prompt('Workspace name')
              if (name) createWorkspace(name)
            }}
          >
            + New Workspace
          </Button>
        </SidebarContent>
        <SidebarSeparator />
        <SidebarFooter className="px-4 py-2 space-y-2">
          <Button
            variant="ghost"
            className="w-full"
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
          >
            Export ZIP
          </Button>
          <Button
            variant="ghost"
            className="w-full"
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
            className="w-full"
          />
        </SidebarFooter>
      </Sidebar>
  )
}

export default WorkspaceSidebar 