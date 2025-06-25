import { create } from "zustand"
import { persist } from "zustand/middleware"

// Default to Gemini key from .env
const defaultGeminiApiKey = import.meta.env.VITE_GEMINI_API_KEY ?? ""

interface AiStore {
  apiKey: string
  model: string
  provider: "openai" | "gemini"
  setApiKey: (key: string) => void
  setModel: (model: string) => void
  setProvider: (provider: "openai" | "gemini") => void
}

export const useAiStore = create<AiStore>()(
  persist(
    (set) => ({
      // Use default Gemini key and model/provider
      apiKey: defaultGeminiApiKey,
      model: "gemini-2.5-flash",
      provider: "gemini",
      setApiKey: (key: string) => set({ apiKey: key }),
      setModel: (model: string) => set({ model }),
      setProvider: (provider) => set({ provider }),
    }),
    {
      name: "ai-settings",
      serialize: (state: AiStore) => btoa(JSON.stringify(state)),
      deserialize: (str: string) => JSON.parse(atob(str)) as AiStore,
    } as any // eslint-disable-line @typescript-eslint/no-explicit-any
  )
)
