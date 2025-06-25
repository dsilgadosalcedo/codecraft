import { render } from '@testing-library/react'
import React from 'react'
import { beforeEach, describe, expect, it, type Mock, vi } from 'vitest'

import { useAiStore } from '@/store/useAiStore'

import { useAiCompletion } from './use-ai-completion'

// Helper component to capture hook return value
function Capture({ callback }: { callback: (api: any) => void }) {
  callback(useAiCompletion())
  return null
}

describe('useAiCompletion hook', () => {
  beforeEach(() => {
    // Reset store and mocks
    useAiStore.setState({ apiKey: '', model: 'model', provider: 'openai' })
    vi.stubGlobal('fetch', vi.fn())
    vi.clearAllMocks()
  })

  it('returns error when API key is not configured', async () => {
    let api: any
    render(
      <Capture
        callback={c => {
          api = c
        }}
      />
    )
    const result = await api.getAiCompletion('code', 'js')
    expect(result.error).toBe('API key not configured')
    expect(result.suggestions).toEqual([])
  })

  it('calls OpenAI API and returns suggestions', async () => {
    useAiStore.setState({ apiKey: 'key', model: 'model', provider: 'openai' })
    const fakeResponse = { choices: [{ text: 'suggestion' }] }
    ;(fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    })
    let api: any
    render(
      <Capture
        callback={c => {
          api = c
        }}
      />
    )
    const result = await api.getAiCompletion('code', 'js')
    expect(fetch).toHaveBeenCalledWith(
      'https://api.openai.com/v1/completions',
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.suggestions).toEqual(['suggestion'])
  })

  it('calls Gemini API and returns suggestions', async () => {
    useAiStore.setState({ apiKey: 'key', model: 'model', provider: 'gemini' })
    const fakeResponse = { candidates: [{ output: 'gen' }], text: '' }
    ;(fetch as unknown as Mock).mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(fakeResponse),
    })
    let api: any
    render(
      <Capture
        callback={c => {
          api = c
        }}
      />
    )
    const result = await api.getAiCompletion('code', 'js')
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('generateContent'),
      expect.objectContaining({ method: 'POST' })
    )
    expect(result.suggestions).toEqual(['gen'])
  })
})
