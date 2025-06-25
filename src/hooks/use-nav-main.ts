import { useWorkspaceStore } from '@/store/useWorkspaceStore'

export function useNavMain() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    state => state.currentWorkspaceId
  )
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const switchWorkspace = useWorkspaceStore(state => state.switchWorkspace)

  return { workspaces, currentWorkspaceId, createWorkspace, switchWorkspace }
}
