import React, { useEffect, useRef, useState } from "react"
import * as monaco from "monaco-editor"
import EditorUI from "./editor-ui"
import { useAiCompletion } from "./use-ai-completion"

interface EditorContainerProps {
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
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [editorInstance, setEditorInstance] =
    useState<monaco.editor.IStandaloneCodeEditor | null>(null)

  // Initialize Monaco editor
  useEffect(() => {
    if (containerRef.current && !editorInstance) {
      const editor = monaco.editor.create(containerRef.current, {
        automaticLayout: true,
        fixedOverflowWidgets: true,
        language,
        lineNumbers: "off",
        minimap: { enabled: false },
        padding: { top: 14 },
        scrollBeyondLastLine: false,
        tabSize: 2,
        theme: "vs-dark",
        value,
      })

      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })

      setEditorInstance(editor)
    }
  }, [containerRef, editorInstance, language, onChange, value])

  // Synch external value changes into the editor
  useEffect(() => {
    if (editorInstance && editorInstance.getValue() !== value) {
      editorInstance.setValue(value)
    }
  }, [editorInstance, value])

  // Register AI completions once editor is ready
  useAiCompletion(editorInstance, language)

  return <EditorUI id={id} containerRef={containerRef} />
}
