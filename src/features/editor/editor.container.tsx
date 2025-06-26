import { emmetCSS, emmetHTML } from 'emmet-monaco-es'
import * as monaco from 'monaco-editor'
import parserBabel from 'prettier/plugins/babel.mjs'
import parserEstree from 'prettier/plugins/estree.mjs'
import parserHtml from 'prettier/plugins/html.mjs'
import parserPostcss from 'prettier/plugins/postcss.mjs'
import prettier from 'prettier/standalone.mjs'
import React, { useEffect, useRef } from 'react'

import { Button } from '@/components/ui/button'

import EditorUI from './editor.ui'

// Register Emmet support
emmetHTML(monaco)
emmetCSS(monaco)

export interface EditorContainerProps {
  id: string
  language: string
  value: string
  onChange: (value: string) => void
  readOnly?: boolean
}

export default function EditorContainer({
  id,
  language,
  value,
  onChange,
  readOnly = false,
}: EditorContainerProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  // Initialize Monaco editor
  useEffect(() => {
    const element = document.getElementById(id)
    if (!element) return
    if (!editorRef.current) {
      const editor = monaco.editor.create(element, {
        automaticLayout: true,
        fixedOverflowWidgets: true,
        matchBrackets: 'always',
        folding: true,
        showFoldingControls: 'always',
        foldingStrategy: 'auto',
        language,
        lineNumbers: 'off',
        minimap: { enabled: false },
        padding: { top: 14 },
        scrollBeyondLastLine: false,
        tabSize: 2,
        theme: 'vs-dark',
        readOnly,
        value,
      })
      editor.onDidChangeModelContent(() => {
        onChange(editor.getValue())
      })
      editorRef.current = editor
    }
    // Enable JS/TS diagnostics for in-editor linting
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      noSuggestionDiagnostics: false,
    })
    monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
      noSemanticValidation: false,
      noSyntaxValidation: false,
      noSuggestionDiagnostics: false,
    })
  }, [id, language, value, onChange, readOnly])

  // Sync external value changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value)
    }
  }, [value])

  // Format current code with Prettier in main thread
  const formatCode = async () => {
    if (!editorRef.current) return
    const codeToFormat = editorRef.current.getValue()
    let formatted = codeToFormat
    try {
      if (language === 'html') {
        formatted = await prettier.format(codeToFormat, {
          parser: 'html',
          plugins: [parserHtml],
        })
      } else if (language === 'css') {
        formatted = await prettier.format(codeToFormat, {
          parser: 'css',
          plugins: [parserPostcss],
        })
      } else {
        formatted = await prettier.format(codeToFormat, {
          parser: 'babel',
          plugins: [parserBabel, parserEstree],
        })
      }
    } catch (e) {
      console.error('Formatting error:', e)
    }
    editorRef.current.setValue(formatted)
  }

  return (
    <div className="relative h-full">
      <div className="absolute top-2 right-12 z-10 flex gap-1 opacity-50 hover:opacity-100">
        <Button size="sm" onClick={formatCode} title="Format code">
          Format
        </Button>
      </div>
      <EditorUI id={id} />
    </div>
  )
}
