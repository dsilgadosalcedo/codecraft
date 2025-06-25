import { emmetHTML, emmetCSS } from "emmet-monaco-es"
import React, { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import EditorLogo from "./editor-logo"
import { useAiStore } from "../store/useAiStore"

emmetHTML(monaco)
emmetCSS(monaco)

function Editor({
  id,
  language,
  value,
  onChange,
}: {
  id: string
  language: string
  value: string
  onChange: (value: string) => void
}) {
  const apiKey = useAiStore((state) => state.apiKey)
  const model = useAiStore((state) => state.model)
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)

  useEffect(() => {
    const element = document.getElementById(id)

    if (!element) return

    if (!editorRef.current) {
      const editor = monaco.editor.create(element, {
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

      // Register AI completion provider
      // Debounce setup for AI completions
      let debounceTimer: ReturnType<typeof setTimeout> | null = null
      let pendingResolvers: Array<
        (result: monaco.languages.CompletionList) => void
      > = []

      const disposable = monaco.languages.registerCompletionItemProvider(
        language,
        {
          triggerCharacters: [".", "<"],
          provideCompletionItems: (modelInstance, position) => {
            if (!apiKey) {
              return { suggestions: [] }
            }
            const text = modelInstance.getValueInRange({
              startLineNumber: 1,
              startColumn: 1,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            })
            return new Promise<monaco.languages.CompletionList>((resolve) => {
              pendingResolvers.push(resolve)
              if (debounceTimer) {
                clearTimeout(debounceTimer)
              }
              debounceTimer = setTimeout(async () => {
                debounceTimer = null
                try {
                  const response = await fetch(
                    "https://api.openai.com/v1/completions",
                    {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${apiKey}`,
                      },
                      body: JSON.stringify({
                        model,
                        prompt: text,
                        max_tokens: 50,
                      }),
                    }
                  )
                  const data = await response.json()
                  const suggestionText = data.choices?.[0]?.text?.trim() || ""
                  const suggestions = [
                    {
                      label: suggestionText.split("\n")[0],
                      kind: monaco.languages.CompletionItemKind.Snippet,
                      insertText: suggestionText,
                      range: {
                        startLineNumber: position.lineNumber,
                        startColumn: 1,
                        endLineNumber: position.lineNumber,
                        endColumn: position.column,
                      },
                    },
                  ]
                  pendingResolvers.forEach((r) => r({ suggestions }))
                } catch {
                  pendingResolvers.forEach((r) => r({ suggestions: [] }))
                }
                pendingResolvers = []
              }, 300)
            })
          },
        }
      )

      editorRef.current = editor
      return () => disposable.dispose()
    }
  }, [id, language, value, onChange])

  // Update editor content when value prop changes
  useEffect(() => {
    if (editorRef.current && editorRef.current.getValue() !== value) {
      editorRef.current.setValue(value)
    }
  }, [value])

  return (
    <div className="overflow-hidden w-full h-96 md:h-full rounded-xl relative border border-green-400/30">
      <div id={id} className="w-full h-full"></div>
      <EditorLogo language={id} />
    </div>
  )
}

export default Editor
