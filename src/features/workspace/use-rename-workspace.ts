import { useEffect, useState } from 'react'

import { useWorkspaceStore } from '@/store/useWorkspaceStore'

export function useRenameWorkspace(initialName: string, id: string) {
  const renameWorkspace = useWorkspaceStore(state => state.renameWorkspace)
  const [name, setName] = useState(initialName)

  useEffect(() => {
    setName(initialName)
  }, [initialName])

  const save = () => {
    renameWorkspace(id, name)
  }

  return { name, setName, save }
}
