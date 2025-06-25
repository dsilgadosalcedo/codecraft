import '@testing-library/jest-dom'

import { vi } from 'vitest'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})

// Mock alert and prompt
Object.defineProperty(window, 'alert', {
  value: vi.fn(),
})

Object.defineProperty(window, 'prompt', {
  value: vi.fn(),
})

// Mock window.open
Object.defineProperty(window, 'open', {
  value: vi.fn(),
})

// Mock fetch globally
global.fetch = vi.fn()

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

// Remove Monaco and Emmet mocks to avoid module resolution issues
