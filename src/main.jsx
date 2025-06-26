import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'next-themes'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import App from './App.tsx'
import './styles.css'
import reportWebVitals from './reportWebVitals.js'
import { setupMonacoEnvironment } from '@/utils/monacoSetup'

// Configure Monaco web workers
setupMonacoEnvironment()

const rootRoute = createRootRoute({
  component: () => (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <Outlet />
      {/* <TanStackRouterDevtools /> */}
    </ThemeProvider>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const routeTree = rootRoute.addChildren([indexRoute])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
