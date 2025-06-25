import React from 'react'

import { useAiSettings } from '@/features/editor/use-ai-settings'

import SettingsModalUI from './settings-modal.ui'

export default function SettingsModal() {
  const { apiKey, model, provider, setApiKey, setModel, setProvider } =
    useAiSettings()

  return (
    <SettingsModalUI
      apiKey={apiKey}
      model={model}
      provider={provider}
      setApiKey={setApiKey}
      setModel={setModel}
      setProvider={setProvider}
    />
  )
}
