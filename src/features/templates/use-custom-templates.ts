import React, { useState, useEffect } from "react"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"

export interface TemplateFiles {
  html: string
  css: string
  js: string
}

export interface CustomTemplate {
  name: string
  description?: string
  files: TemplateFiles
  icon?: React.ReactNode
  category?: string
}

export function useCustomTemplates() {
  const [customTemplates, setCustomTemplates] = useState<CustomTemplate[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("customTemplates")
    if (stored) {
      try {
        setCustomTemplates(JSON.parse(stored))
      } catch {
        setCustomTemplates([])
      }
    }
  }, [])

  const saveCustomTemplate = () => {
    const name = prompt("Template name:")
    if (!name) return
    const state = useWorkspaceStore.getState()
    const current = state.workspaces.find(
      (ws) => ws.id === state.currentWorkspaceId
    )
    if (!current) return
    const newTemplate: CustomTemplate = {
      name,
      description: "Custom template saved from workspace",
      files: { html: current.html, css: current.css, js: current.js },
    }
    const updated = [...customTemplates, newTemplate]
    setCustomTemplates(updated)
    localStorage.setItem("customTemplates", JSON.stringify(updated))
  }

  return { customTemplates, saveCustomTemplate }
}
