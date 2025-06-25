import { describe, expect, it } from 'vitest'

import { useWorkspaceStore } from './useWorkspaceStore'

describe('workspace store', () => {
  it('initializes with one workspace', () => {
    const { workspaces, currentWorkspaceId } = useWorkspaceStore.getState()
    expect(workspaces.length).toBeGreaterThanOrEqual(1)
    expect(currentWorkspaceId).toBe(workspaces[0].id)
  })

  it('createWorkspace adds new workspace', () => {
    const initialLength = useWorkspaceStore.getState().workspaces.length
    useWorkspaceStore.getState().createWorkspace('Test')
    const { workspaces, currentWorkspaceId } = useWorkspaceStore.getState()
    expect(workspaces.length).toBe(initialLength + 1)
    expect(currentWorkspaceId).toBe(workspaces[workspaces.length - 1].id)
  })

  it('renameWorkspace updates name', () => {
    const { currentWorkspaceId, renameWorkspace } = useWorkspaceStore.getState()
    const newName = 'NewName'
    renameWorkspace(currentWorkspaceId, newName)
    const updated = useWorkspaceStore
      .getState()
      .workspaces.find(w => w.id === currentWorkspaceId)
    expect(updated?.name).toBe(newName)
  })

  it('deleteWorkspace removes workspace', () => {
    useWorkspaceStore.getState().createWorkspace('ToDelete')
    const wsToDelete = useWorkspaceStore.getState().workspaces.slice(-1)[0]
    useWorkspaceStore.getState().deleteWorkspace(wsToDelete.id)
    const found = useWorkspaceStore
      .getState()
      .workspaces.find(w => w.id === wsToDelete.id)
    expect(found).toBeUndefined()
  })
})
