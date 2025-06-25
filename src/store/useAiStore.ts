import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import type { AiProvider, AiSettings } from '@/types'

// Default to Gemini key from .env
const defaultGeminiApiKey = import.meta.env.VITE_GEMINI_API_KEY ?? ''

interface AiStore extends AiSettings {
  setApiKey: (key: string) => void
  setModel: (model: string) => void
  setProvider: (provider: AiProvider) => void
}

export const useAiStore = create<AiStore>()(
  persist(
    set => ({
      // Use default Gemini key and model/provider
      apiKey: defaultGeminiApiKey,
      model: 'gemini-2.5-flash',
      provider: 'gemini' as AiProvider,
      setApiKey: (key: string) => set({ apiKey: key }),
      setModel: (model: string) => set({ model }),
      setProvider: (provider: AiProvider) => set({ provider }),
    }),
    {
      name: 'ai-settings',
    }
  )
)
