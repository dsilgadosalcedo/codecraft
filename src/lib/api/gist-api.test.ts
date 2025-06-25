import { beforeEach, describe, expect, it, vi } from 'vitest'

import { exportGist } from './gist'

describe('exportGist', () => {
  const token = 'token'
  const description = 'desc'
  const files = { html: '<h1>', css: 'body{}', js: 'console.log()' }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls fetch and returns html_url', async () => {
    const fakeData = { html_url: 'url' }
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(fakeData),
    })
    const result = await exportGist(token, description, files)
    expect(fetch).toHaveBeenCalledWith(
      'https://api.github.com/gists',
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          Authorization: `token ${token}`,
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
          description,
          public: false,
          files: {
            'index.html': { content: files.html },
            'style.css': { content: files.css },
            'script.js': { content: files.js },
          },
        }),
      })
    )
    expect(result).toBe('url')
  })

  it('throws error when html_url missing', async () => {
    ;(fetch as any).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({}),
    })
    await expect(exportGist(token, description, files)).rejects.toThrow(
      'Failed to create gist'
    )
  })
})
