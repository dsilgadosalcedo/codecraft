import React from 'react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { SidebarMenuButton } from '@/components/ui/sidebar'

import { useWorkspaceStore } from '../store/useWorkspaceStore'

export default function SwitchWorkspaceDropdown() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    state => state.currentWorkspaceId
  )
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)
  const currentWorkspace = workspaces.find(ws => ws.id === currentWorkspaceId)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          {currentWorkspace?.name || 'Workspace'}
        </SidebarMenuButton>
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
