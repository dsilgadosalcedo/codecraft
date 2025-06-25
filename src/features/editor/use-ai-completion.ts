import { useEffect } from "react"
import * as monaco from "monaco-editor"
import { useAiStore } from "@/store/useAiStore"

export function useAiCompletion(
  editorInstance: monaco.editor.IStandaloneCodeEditor | null,
  language: string
) {
  const apiKey = useAiStore((state) => state.apiKey)
  const model = useAiStore((state) => state.model)
  const provider = useAiStore((state) => state.provider)

  useEffect(() => {
    if (!editorInstance) return

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
                let suggestionText = ""
                if (provider === "openai") {
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
                  suggestionText = data.choices?.[0]?.text?.trim() || ""
                } else if (provider === "gemini") {
                  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`
                  const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      contents: [{ parts: [{ text }] }],
                    }),
                  })
                  const data = await response.json()
                  suggestionText =
                    data.candidates?.[0]?.output?.trim() ||
                    data.text?.trim() ||
                    ""
                }
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

    return () => disposable.dispose()
  }, [editorInstance, language, apiKey, model, provider])
}
