import { beforeEach, describe, expect, it, vi } from 'vitest'

import { useAiStore } from '@/store/useAiStore'

import { useAiCompletion } from './use-ai-completion'

describe('useAiCompletion hook', () => {
  beforeEach(() => {
    // Reset store and mocks
    useAiStore.setState({ apiKey: '', model: 'model', provider: 'openai' })
    vi.clearAllMocks()
  })

  it('returns error when API key is not configured', async () => {
    const { getAiCompletion } = useAiCompletion()
    const result = await getAiCompletion('code', 'js')
    expect(result.error).toBe('API key not configured')
    expect(result.suggestions).toEqual([])
  })

  it('calls OpenAI API and returns suggestions', async () => {
    useAiStore.setState({ apiKey: 'key', model: 'model', provider: 'openai' })
    const fakeResponse = { choices: [{ text: 'suggestion' }] }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    })
    const { getAiCompletion } = useAiCompletion()
    const result = await getAiCompletion('code', 'js')
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/completions',
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.suggestions).toEqual(['suggestion'])
  })

  it('calls Gemini API and returns suggestions', async () => {
    useAiStore.setState({ apiKey: 'key', model: 'model', provider: 'gemini' })
    const fakeResponse = { candidates: [{ output: 'gen' }], text: '' }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    })
    const { getAiCompletion } = useAiCompletion()
    const result = await getAiCompletion('code', 'js')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('generateContent'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.suggestions).toEqual(['gen'])
  })
})
