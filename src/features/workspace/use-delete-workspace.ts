import { useWorkspaceStore } from '@/store/useWorkspaceStore'

export function useDeleteWorkspace(id: string) {
  const deleteWorkspace = useWorkspaceStore(state => state.deleteWorkspace)

  const handleDelete = () => {
    deleteWorkspace(id)
  }

  return { deleteWorkspace: handleDelete }
}
