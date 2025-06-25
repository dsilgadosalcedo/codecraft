import { emmetCSS, emmetHTML } from 'emmet-monaco-es'
import * as monaco from 'monaco-editor'
import React, { useEffect, useRef } from 'react'

import EditorUI from './editor.ui'
import { useAiCompletion } from './use-ai-completion'

// Register Emmet support
emmetHTML(monaco)
emmetCSS(monaco)

export interface EditorContainerProps {
  id: string
  language: string
  value: string
  onChange: (value: string) => void
}

export default function EditorContainer({
  id,
  language,
  value,
  onChange,
}: EditorContainerProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  // AI completion (hook returns getAiCompletion, isConfigured, etc.)
  useAiCompletion()

  // Initialize Monaco editor
  useEffect(() => {
    const element = document.getElementById(id)
    if (!element) return
    if (!editorRef.current) {
      const editor = monaco.editor.create(element, {
        automaticLayout: true,
        fixedOverflowWidgets: true,
        language,
        lineNumbers: 'off',
        minimap: { enabled: false },
        padding: { top: 14 },
        scrollBeyondLastLine: false,
        tabSize: 2,
        theme: 'vs-dark',
        value,
      })
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })
      editorRef.current = editor
    }
  }, [id, language, value, onChange])

  // Sync external value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value)
    }
  }, [value])

  return <EditorUI id={id} />
}
