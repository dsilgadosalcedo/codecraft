import { Maximize2, Minimize2 } from 'lucide-react'
import React, { lazy, Suspense, useEffect, useState } from 'react'
import Split from 'react-split-grid'

import { AppSidebar } from '@/components/app-sidebar'
import { Button } from '@/components/ui/button'
import { SidebarProvider } from '@/components/ui/sidebar'
import Preview from '@/features/preview/preview'

import { useWorkspaceStore } from './store/useWorkspaceStore'
import { initialCss, initialHtml, initialJs } from './utils/initialCode'

// Dynamically import Editor container for code splitting
const Editor = lazy(() => import('@/features/editor/editor.container'))

function App() {
  const workspaces = useWorkspaceStore(state => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    state => state.currentWorkspaceId
  )
  const updateWorkspaceFiles = useWorkspaceStore(
    state => state.updateWorkspaceFiles
  )
  const renameWorkspace = useWorkspaceStore(state => state.renameWorkspace)

  const currentWorkspace =
    workspaces.find(w => w.id === currentWorkspaceId) || workspaces[0]
  const html = currentWorkspace?.html ?? initialHtml
  const css = currentWorkspace?.css ?? initialCss
  const js = currentWorkspace?.js ?? initialJs
  const [code, setCode] = useState('')
  const [maximized, setMaximized] = useState<string | null>(null)
  const [shareReadOnly, setShareReadOnly] = useState(false)

  // On mount: check for share data in URL

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const share = params.get('share')
    const mode = params.get('mode')
    if (share) {
      try {
        // Properly decode UTF-8 encoded base64 share payload (handle Unicode)
        const base64 = decodeURIComponent(share)
        const binary = atob(base64)
        // Convert binary string to percent-encoded UTF-8, then decode
        const percentEncoded = Array.from(binary)
          .map(c => `%${c.charCodeAt(0).toString(16).padStart(2, '0')}`)
          .join('')
        const decoded = JSON.parse(decodeURIComponent(percentEncoded))
        updateWorkspaceFiles({
          html: decoded.html,
          css: decoded.css,
          js: decoded.js,
        })
        renameWorkspace(
          currentWorkspaceId,
          decoded.name || currentWorkspace.name
        )
        setShareReadOnly(mode === 'ro')
      } catch {
        console.error('Invalid share data')
      }
    }
  }, [])

  const readOnly = shareReadOnly

  const setHtml = (value: string) => updateWorkspaceFiles({ html: value })
  const setCss = (value: string) => updateWorkspaceFiles({ css: value })
  const setJs = (value: string) => updateWorkspaceFiles({ js: value })

  useEffect(() => {
    // Extract any <head> and <body> content from the template HTML
    const raw = html || ''
    const headMatch = raw.match(/<head[^>]*>([\s\S]*?)<\/head>/i)
    const bodyMatch = raw.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
    const injectedHead = headMatch ? headMatch[1] : ''
    const injectedBody = bodyMatch ? bodyMatch[1] : raw

    // Build the final document, preserving template head tags (e.g., CDNs)
    const full = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Codecraft project</title>
  ${injectedHead}
  <style>${css}</style>
</head>
<body>
  ${injectedBody}
  <script defer>${js}</script>
</body>
</html>`
    setCode(full)
  }, [html, css, js])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full">
        {maximized ? (
          <div className="relative w-full h-screen p-2">
            <div className="absolute top-2 right-2 z-10">
              <Button
                size="icon"
                onClick={() => setMaximized(null)}
                className="size-8 absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
              >
                <Minimize2 size={16} />
              </Button>
            </div>
            {maximized === 'preview' ? (
              <Preview code={code} />
            ) : (
              <Suspense fallback={<div>Loading editor...</div>}>
                <Editor
                  id={maximized}
                  language={
                    maximized === 'html'
                      ? 'html'
                      : maximized === 'css'
                        ? 'css'
                        : 'javascript'
                  }
                  value={
                    maximized === 'html' ? html : maximized === 'css' ? css : js
                  }
                  onChange={
                    maximized === 'html'
                      ? setHtml
                      : maximized === 'css'
                        ? setCss
                        : setJs
                  }
                  readOnly={readOnly}
                />
              </Suspense>
            )}
          </div>
        ) : (
          <Split
            gridTemplateRows="1fr 6px 1fr"
            gridTemplateColumns="1fr 6px 1fr"
            // @ts-expect-error ts-migrate(2339)
            render={({ getGridProps, getGutterProps }) => (
              <div
                className="flex flex-col gap-2 md:gap-0 p-2 md:grid min-h-screen md:h-screen grid-rows-[1fr_6px_1fr] grid-cols-[1fr_6px_1fr]"
                {...getGridProps()}
              >
                <div className="relative">
                  <Suspense fallback={<div>Loading editor...</div>}>
                    <Editor
                      id="html"
                      language="html"
                      value={html}
                      onChange={setHtml}
                      readOnly={readOnly}
                    />
                  </Suspense>
                  <Button
                    size="icon"
                    className="size-8 absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
                    onClick={() => setMaximized('html')}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Suspense fallback={<div>Loading editor...</div>}>
                    <Editor
                      id="css"
                      language="css"
                      value={css}
                      onChange={setCss}
                      readOnly={readOnly}
                    />
                  </Suspense>
                  <Button
                    size="icon"
                    className="size-8 absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
                    onClick={() => setMaximized('css')}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Suspense fallback={<div>Loading editor...</div>}>
                    <Editor
                      id="js"
                      language="javascript"
                      value={js}
                      onChange={setJs}
                      readOnly={readOnly}
                    />
                  </Suspense>
                  <Button
                    size="icon"
                    className="size-8 absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
                    onClick={() => setMaximized('js')}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Preview code={code} />
                  <Button
                    size="icon"
                    className="size-8 absolute top-2 right-2 z-10 opacity-50 hover:opacity-100"
                    onClick={() => setMaximized('preview')}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div
                  className="col-start-2 col-end-2 row-start-1 row-end-4 cursor-col-resize"
                  {...getGutterProps('column', 1)}
                />
                <div
                  className="col-start-1 col-end-4 row-start-2 row-end-2 cursor-row-resize"
                  {...getGutterProps('row', 1)}
                />
              </div>
            )}
          />
        )}
      </main>
    </SidebarProvider>
  )
}

export default App
