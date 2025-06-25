import { useAiStore } from '@/store/useAiStore'

export function useAiSettings() {
  const apiKey = useAiStore(state => state.apiKey)
  const model = useAiStore(state => state.model)
  const provider = useAiStore(state => state.provider)
  const setApiKey = useAiStore(state => state.setApiKey)
  const setModel = useAiStore(state => state.setModel)
  const setProvider = useAiStore(state => state.setProvider)

  return { apiKey, model, provider, setApiKey, setModel, setProvider }
}
