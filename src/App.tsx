import { setupMonacoEnvironment } from "./utils/monacoSetup"
import React, { useEffect, useState } from "react"
import Split from "react-split-grid"
import { useWorkspaceStore } from "./store/useWorkspaceStore"

import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import Editor from "@/components/Editor"
import Preview from "@/components/Preview"
import { Button } from "@/components/ui/button"
import { Maximize2, Minimize2 } from "lucide-react"

function App() {
  const workspaces = useWorkspaceStore((state) => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    (state) => state.currentWorkspaceId
  )
  const updateWorkspaceFiles = useWorkspaceStore(
    (state) => state.updateWorkspaceFiles
  )
  const currentWorkspace =
    workspaces.find((w) => w.id === currentWorkspaceId) || workspaces[0]
  const { html, css, js } = currentWorkspace
  const [code, setCode] = useState("")
  const [maximized, setMaximized] = useState<string | null>(null)

  const setHtml = (value: string) => updateWorkspaceFiles({ html: value })
  const setCss = (value: string) => updateWorkspaceFiles({ css: value })
  const setJs = (value: string) => updateWorkspaceFiles({ js: value })

  useEffect(() => {
    setupMonacoEnvironment()
  }, [])

  useEffect(() => {
    setCode(`
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Codecraft project</title>
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script defer>${js}</script>
        </body>
      </html>
    `)
  }, [html, css, js])

  return (
    <SidebarProvider defaultOpen={false}>
      <AppSidebar />
      <main className="w-full">
        {maximized ? (
          <div className="relative w-full h-screen p-2">
            <div className="absolute top-2 right-2 z-10">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMaximized(null)}
              >
                <Minimize2 size={16} />
              </Button>
            </div>
            {maximized === "preview" ? (
              <Preview code={code} />
            ) : (
              <Editor
                id={maximized}
                language={
                  maximized === "html"
                    ? "html"
                    : maximized === "css"
                    ? "css"
                    : "javascript"
                }
                value={
                  maximized === "html" ? html : maximized === "css" ? css : js
                }
                onChange={
                  maximized === "html"
                    ? setHtml
                    : maximized === "css"
                    ? setCss
                    : setJs
                }
              />
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
                  <Editor
                    id="html"
                    language="html"
                    value={html}
                    onChange={setHtml}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setMaximized("html")}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Editor
                    id="css"
                    language="css"
                    value={css}
                    onChange={setCss}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setMaximized("css")}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Editor
                    id="js"
                    language="javascript"
                    value={js}
                    onChange={setJs}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setMaximized("js")}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div className="relative">
                  <Preview code={code} />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10"
                    onClick={() => setMaximized("preview")}
                  >
                    <Maximize2 size={16} />
                  </Button>
                </div>
                <div
                  className="col-start-2 col-end-2 row-start-1 row-end-4 cursor-col-resize"
                  {...getGutterProps("column", 1)}
                />
                <div
                  className="col-start-1 col-end-4 row-start-2 row-end-2 cursor-row-resize"
                  {...getGutterProps("row", 1)}
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
