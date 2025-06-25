import { useAiStore } from "@/store/useAiStore"
import type {
  AiCompletionRequest,
  AiCompletionResponse,
  OpenAIResponse,
  GeminiResponse,
} from "@/types"

export function useAiCompletion() {
  const { apiKey, model, provider } = useAiStore()

  const getAiCompletion = async (
    text: string,
    language: string
  ): Promise<AiCompletionResponse> => {
    if (!apiKey) {
      return { suggestions: [], error: "API key not configured" }
    }

    const request: AiCompletionRequest = {
      text,
      language,
      model,
      provider,
    }

    try {
      if (provider === "openai") {
        return await getOpenAICompletion(request)
      } else {
        return await getGeminiCompletion(request)
      }
    } catch (error) {
      console.error("AI completion error:", error)
      return {
        suggestions: [],
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  }

  const getOpenAICompletion = async (
    request: AiCompletionRequest
  ): Promise<AiCompletionResponse> => {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: request.model,
        prompt: `Complete this ${request.language} code:\n${request.text}`,
        max_tokens: 50,
        temperature: 0.3,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data: OpenAIResponse = await response.json()
    const suggestions =
      data.choices?.map((choice) => choice.text || "").filter(Boolean) || []

    return { suggestions }
  }

  const getGeminiCompletion = async (
    request: AiCompletionRequest
  ): Promise<AiCompletionResponse> => {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${request.model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Complete this ${request.language} code concisely:\n${request.text}`,
                },
              ],
            },
          ],
        }),
      }
    )

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const data: GeminiResponse = await response.json()
    const suggestion = data.candidates?.[0]?.output || data.text || ""

    return { suggestions: suggestion ? [suggestion] : [] }
  }

  return {
    getAiCompletion,
    isConfigured: !!apiKey,
    provider,
    model,
  }
}
