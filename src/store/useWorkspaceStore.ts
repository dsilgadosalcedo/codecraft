import { create } from "zustand"
import { persist } from "zustand/middleware"
import { initialHtml, initialCss, initialJs } from "../utils/initialCode"

export type Workspace = {
  id: string
  name: string
  html: string
  css: string
  js: string
}

type WorkspaceStore = {
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

export const useWorkspaceStore = create<WorkspaceStore>()(
  persist<WorkspaceStore>(
    (set, get) => {
      const defaultWorkspace: Workspace = {
        id: Date.now().toString(),
        name: "Workspace 1",
        html: initialHtml,
        css: initialCss,
        js: initialJs,
      }

      return {
        workspaces: [defaultWorkspace],
        currentWorkspaceId: defaultWorkspace.id,

        createWorkspace: (
          name = `Workspace ${get().workspaces.length + 1}`
        ) => {
          const newWs: Workspace = {
            id: Date.now().toString(),
            name,
            html: initialHtml,
            css: initialCss,
            js: initialJs,
          }
          set((state) => ({
            workspaces: [...state.workspaces, newWs],
            currentWorkspaceId: newWs.id,
          }))
        },

        switchWorkspace: (id: string) => {
          set({ currentWorkspaceId: id })
        },

        renameWorkspace: (id: string, name: string) => {
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === id ? { ...w, name } : w
            ),
          }))
        },

        deleteWorkspace: (id: string) => {
          set((state) => {
            const updated = state.workspaces.filter((w) => w.id !== id)
            if (updated.length === 0) {
              const newWs: Workspace = {
                id: Date.now().toString(),
                name: "Workspace 1",
                html: initialHtml,
                css: initialCss,
                js: initialJs,
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

        updateWorkspaceFiles: (
          data: Partial<{ html: string; css: string; js: string }>
        ) => {
          set((state) => ({
            workspaces: state.workspaces.map((w) =>
              w.id === state.currentWorkspaceId ? { ...w, ...data } : w
            ),
          }))
        },
      }
    },
    {
      name: "workspace-storage",
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (!state.workspaces || state.workspaces.length === 0) {
            const newWs: Workspace = {
              id: Date.now().toString(),
              name: "Workspace 1",
              html: initialHtml,
              css: initialCss,
              js: initialJs,
            }
            state.workspaces = [newWs]
            state.currentWorkspaceId = newWs.id
          }
        }
      },
    }
  )
)
