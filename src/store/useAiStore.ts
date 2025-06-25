import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AiStore {
  apiKey: string
  model: string
  setApiKey: (key: string) => void
  setModel: (model: string) => void
}

export const useAiStore = create<AiStore>()(
  persist(
    (set) => ({
      apiKey: "",
      model: "gpt-3.5-turbo",
      setApiKey: (key: string) => set({ apiKey: key }),
      setModel: (model: string) => set({ model }),
    }),
    {
      name: "ai-settings",
      serialize: (state: AiStore) => btoa(JSON.stringify(state)),
      deserialize: (str: string) => JSON.parse(atob(str)) as AiStore,
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  )
)
