import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import type { UseWorkspacesResult } from '@/types'

export function useWorkspaces(): UseWorkspacesResult {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    state => state.currentWorkspaceId
  )
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)
  const renameWorkspace = useWorkspaceStore(state => state.renameWorkspace)
  const deleteWorkspace = useWorkspaceStore(state => state.deleteWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(
    state => state.updateWorkspaceFiles
  )

  const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId)

  return {
    workspaces,
    currentWorkspaceId,
    currentWorkspace,
    createWorkspace,
    switchWorkspace,
    renameWorkspace,
    deleteWorkspace,
    updateWorkspaceFiles,
  }
}
