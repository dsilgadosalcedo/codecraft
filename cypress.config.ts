import { defineConfig } from 'cypress'
import { createRequire } from 'module'

const requireCJS = createRequire(import.meta.url)
// Load the Vite dev server plugin and Vite config via CommonJS
const { startDevServer } = requireCJS('@cypress/vite-dev-server')

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    async setupNodeEvents(on, config) {
      // @ts-expect-error no types for vite.config
      const { default: viteConfig } = await import('./vite.config.js')
      on('dev-server:start', async options =>
        startDevServer({ options, viteConfig })
      )
      return config
    },
  },
})
