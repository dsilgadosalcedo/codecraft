// Core workspace types
export interface Workspace {
  id: string
  name: string
  html: string
  css: string
  js: string
  createdAt?: Date
  updatedAt?: Date
}

export interface WorkspaceFiles {
  html: string
  css: string
  js: string
}

// Template types
export interface TemplateFiles {
  html: string
  css: string
  js: string
}

export interface Template {
  name: string
  description?: string
  files: TemplateFiles
  icon?: React.ReactNode
  category?: string
  isCustom?: boolean
}

// AI completion types
export type AiProvider = 'openai' | 'gemini'

export interface AiSettings {
  apiKey: string
  model: string
  provider: AiProvider
}

export interface AiCompletionRequest {
  text: string
  language: string
  model: string
  provider: AiProvider
}

export interface AiCompletionResponse {
  suggestions: string[]
  error?: string
}

// API response types
export interface OpenAIResponse {
  choices: Array<{
    text?: string
  }>
}

export interface GeminiResponse {
  candidates?: Array<{
    output?: string
  }>
  text?: string
}

// Import/Export types
export interface ExportData {
  html: string
  css: string
  js: string
}

export interface ImportResult {
  html: string
  css: string
  js: string
  success: boolean
  error?: string
}

export interface GistResponse {
  html_url: string
  id: string
}

// UI component prop types
export interface EditorProps {
  id: string
  language: string
  value: string
  onChange: (value: string) => void
}

export interface PreviewProps {
  code: string
}

// Hook return types
export interface UseWorkspacesResult {
  workspaces: Workspace[]
  currentWorkspaceId: string
  currentWorkspace: Workspace | undefined
  createWorkspace: (name?: string) => void
  switchWorkspace: (id: string) => void
  renameWorkspace: (id: string, name: string) => void
  deleteWorkspace: (id: string) => void
  updateWorkspaceFiles: (data: Partial<WorkspaceFiles>) => void
}

export interface UseCustomTemplatesResult {
  customTemplates: Template[]
  saveCustomTemplate: () => void
  deleteCustomTemplate: (name: string) => void
}

export interface UseImportExportResult {
  currentWorkspace: Workspace | undefined
  fileInputRef: React.RefObject<HTMLInputElement>
  exportZipHandler: () => Promise<void>
  exportGistHandler: () => Promise<void>
  importZipHandler: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>
  isLoading: boolean
  error: string | null
}

// Error types
export interface AppError {
  code: string
  message: string
  details?: unknown
}

// Monaco Editor types
export interface MonacoCompletionItem {
  label: string
  kind: number
  insertText: string
  range: {
    startLineNumber: number
    startColumn: number
    endLineNumber: number
    endColumn: number
  }
}

export interface MonacoCompletionList {
  suggestions: MonacoCompletionItem[]
}

// Event types
export interface WorkspaceChangeEvent {
  workspaceId: string
  changes: Partial<WorkspaceFiles>
}

export interface TemplateSelectEvent {
  template: Template
  workspaceId: string
}
