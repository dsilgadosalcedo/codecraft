import { useEffect, useState } from 'react'

import { useWorkspaceStore } from '@/store/useWorkspaceStore'
import type { Template, UseCustomTemplatesResult } from '@/types'

export function useCustomTemplates(): UseCustomTemplatesResult {
  const [customTemplates, setCustomTemplates] = useState<Template[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('customTemplates')
    if (stored) {
      try {
        setCustomTemplates(JSON.parse(stored))
      } catch {
        setCustomTemplates([])
      }
    }
  }, [])

  const saveCustomTemplate = () => {
    const name = prompt('Template name:')
    if (!name) return
    const state = useWorkspaceStore.getState()
    const current = state.workspaces.find(
      ws => ws.id === state.currentWorkspaceId
    )
    if (!current) return

    const newTemplate: Template = {
      name,
      description: 'Custom template saved from workspace',
      files: { html: current.html, css: current.css, js: current.js },
      isCustom: true,
    }
    const updated = [...customTemplates, newTemplate]
    setCustomTemplates(updated)
    localStorage.setItem('customTemplates', JSON.stringify(updated))
  }

  const deleteCustomTemplate = (name: string) => {
    const updated = customTemplates.filter(t => t.name !== name)
    setCustomTemplates(updated)
    localStorage.setItem('customTemplates', JSON.stringify(updated))
  }

  return { customTemplates, saveCustomTemplate, deleteCustomTemplate }
}
