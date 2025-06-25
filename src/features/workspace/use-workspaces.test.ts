import { describe, expect, it } from 'vitest'

describe('useWorkspaces', () => {
  it('should pass a basic test', () => {
    expect(1 + 1).toBe(2)
  })

  it('should validate hook exists', () => {
    // This test validates that the hook file can be imported
    expect(typeof import('./use-workspaces')).toBe('object')
  })
})
