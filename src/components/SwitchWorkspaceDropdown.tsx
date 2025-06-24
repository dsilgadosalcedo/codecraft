import React from 'react'
import { useWorkspaceStore } from '../store/useWorkspaceStore'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

export default function SwitchWorkspaceDropdown() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(state => state.currentWorkspaceId)
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)
  const currentWorkspace = workspaces.find(ws => ws.id === currentWorkspaceId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{currentWorkspace?.name || 'Workspace'}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {workspaces.map(ws => (
          <DropdownMenuItem key={ws.id} onSelect={() => switchWorkspace(ws.id)}>
            {ws.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 