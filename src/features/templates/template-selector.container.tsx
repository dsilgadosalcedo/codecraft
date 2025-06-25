import React from "react"
import TemplateSelectorUI from "./template-selector.ui"
import { builtInTemplates, Template } from "./built-in-templates"
import { useCustomTemplates } from "./use-custom-templates"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"

export default function TemplateSelectorContainer() {
  const { customTemplates, saveCustomTemplate } = useCustomTemplates()
  const createWorkspace = useWorkspaceStore((s) => s.createWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore((s) => s.updateWorkspaceFiles)

  const allTemplates: Template[] = [...builtInTemplates, ...customTemplates]

  const handleSelect = (template: Template) => {
    createWorkspace(template.name)
    updateWorkspaceFiles(template.files)
  }

  return (
    <TemplateSelectorUI
      templates={allTemplates}
      onSaveCustom={saveCustomTemplate}
      onSelect={handleSelect}
    />
  )
}
