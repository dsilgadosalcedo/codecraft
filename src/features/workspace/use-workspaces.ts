import { useWorkspaceStore, Workspace } from "@/store/useWorkspaceStore"

export interface UseWorkspacesResult {
  workspaces: Workspace[]
  currentWorkspaceId: string
  createWorkspace: (name?: string) => void
  switchWorkspace: (id: string) => void
  renameWorkspace: (id: string, name: string) => void
  deleteWorkspace: (id: string) => void
  updateWorkspaceFiles: (
    data: Partial<{ html: string; css: string; js: string }>
  ) => void
}

export function useWorkspaces(): UseWorkspacesResult {
  const workspaces = useWorkspaceStore((state) => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    (state) => state.currentWorkspaceId
  )
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace)
  const switchWorkspace = useWorkspaceStore((state) => state.switchWorkspace)
  const renameWorkspace = useWorkspaceStore((state) => state.renameWorkspace)
  const deleteWorkspace = useWorkspaceStore((state) => state.deleteWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(
    (state) => state.updateWorkspaceFiles
  )

  return {
    workspaces,
    currentWorkspaceId,
    createWorkspace,
    switchWorkspace,
    renameWorkspace,
    deleteWorkspace,
    updateWorkspaceFiles,
  }
}
