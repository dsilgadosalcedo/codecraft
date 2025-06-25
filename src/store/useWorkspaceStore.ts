import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { Workspace, WorkspaceFiles } from '@/types'

import { initialCss, initialHtml, initialJs } from '../utils/initialCode'

type WorkspaceStore = {
  workspaces: Workspace[]
  currentWorkspaceId: string
  createWorkspace: (name?: string) => void
  switchWorkspace: (id: string) => void
  renameWorkspace: (id: string, name: string) => void
  deleteWorkspace: (id: string) => void
  updateWorkspaceFiles: (data: Partial<WorkspaceFiles>) => void
}

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist<WorkspaceStore>(
    (set, get) => {
      const defaultWorkspace: Workspace = {
        id: Date.now().toString(),
        name: 'Workspace 1',
        html: initialHtml,
        css: initialCss,
        js: initialJs,
        createdAt: new Date(),
        updatedAt: new Date(),
      }

      return {
        workspaces: [defaultWorkspace],
        currentWorkspaceId: defaultWorkspace.id,

        createWorkspace: (
          name = `Workspace ${get().workspaces.length + 1}`
        ) => {
          const now = new Date()
          const newWs: Workspace = {
            id: Date.now().toString(),
            name,
            html: initialHtml,
            css: initialCss,
            js: initialJs,
            createdAt: now,
            updatedAt: now,
          }
          set(state => ({
            workspaces: [...state.workspaces, newWs],
            currentWorkspaceId: newWs.id,
          }))
        },

        switchWorkspace: (id: string) => {
          set({ currentWorkspaceId: id })
        },

        renameWorkspace: (id: string, name: string) => {
          set(state => ({
            workspaces: state.workspaces.map(w =>
              w.id === id ? { ...w, name, updatedAt: new Date() } : w
            ),
          }))
        },

        deleteWorkspace: (id: string) => {
          set(state => {
            const updated = state.workspaces.filter(w => w.id !== id)
            if (updated.length === 0) {
              const now = new Date()
              const newWs: Workspace = {
                id: Date.now().toString(),
                name: 'Workspace 1',
                html: initialHtml,
                css: initialCss,
                js: initialJs,
                createdAt: now,
                updatedAt: now,
              }
              return { workspaces: [newWs], currentWorkspaceId: newWs.id }
            }
            const newCurrentId =
              state.currentWorkspaceId === id
                ? updated[0].id
                : state.currentWorkspaceId
            return { workspaces: updated, currentWorkspaceId: newCurrentId }
          })
        },

        updateWorkspaceFiles: (data: Partial<WorkspaceFiles>) => {
          set(state => ({
            workspaces: state.workspaces.map(w =>
              w.id === state.currentWorkspaceId
                ? { ...w, ...data, updatedAt: new Date() }
                : w
            ),
          }))
        },
      }
    },
    {
      name: 'workspace-storage',
      onRehydrateStorage: () => state => {
        if (state) {
          if (!state.workspaces || state.workspaces.length === 0) {
            const now = new Date()
            const newWs: Workspace = {
              id: Date.now().toString(),
              name: 'Workspace 1',
              html: initialHtml,
              css: initialCss,
              js: initialJs,
              createdAt: now,
              updatedAt: now,
            }
            state.workspaces = [newWs]
            state.currentWorkspaceId = newWs.id
          }
        }
      },
    }
  )
)

// Re-export the Workspace type for backward compatibility
export type { Workspace }
