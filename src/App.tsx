import { setupMonacoEnvironment } from "./utils/monacoSetup"
import React, { useEffect, useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import Split from "react-split-grid"
import { useWorkspaceStore } from "./store/useWorkspaceStore"
import WorkspaceSidebar from "./components/WorkspaceSidebar"
import SwitchWorkspaceDropdown from "./components/SwitchWorkspaceDropdown"
import TemplateSelector from "./components/TemplateSelector"
import SettingsModal from "./components/SettingsModal"

function App() {
	const workspaces = useWorkspaceStore(state => state.workspaces)
	const currentWorkspaceId = useWorkspaceStore(state => state.currentWorkspaceId)
	const updateWorkspaceFiles = useWorkspaceStore(state => state.updateWorkspaceFiles)
	const currentWorkspace = workspaces.find(w => w.id === currentWorkspaceId) || workspaces[0]
	const { html, css, js } = currentWorkspace
	const [code, setCode] = useState("")

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
		<div className="flex h-screen">
			<WorkspaceSidebar />
			<div className="flex flex-1 flex-col">
				<header className="flex items-center justify-end space-x-2 p-2 bg-gray-100">
					<SwitchWorkspaceDropdown />
					<TemplateSelector />
					<SettingsModal />
				</header>
				<Split
					gridTemplateRows="1fr 6px 1fr"
					gridTemplateColumns="1fr 6px 1fr"
					// @ts-expect-error ts-migrate(2339)
					render={({ getGridProps, getGutterProps }) => (
						<div
							className='flex flex-col gap-2 md:gap-0 p-2 md:grid min-h-screen md:h-screen grid-rows-[1fr_6px_1fr] grid-cols-[1fr_6px_1fr]'
							{...getGridProps()}
						>
							<Editor id='html' language='html' value={html} onChange={setHtml} />
							<Editor id='css' language='css' value={css} onChange={setCss} />
							<Editor id='js' language='javascript' value={js} onChange={setJs} />
							<Preview code={code} />
							<div
								className='col-start-2 col-end-2 row-start-1 row-end-4 cursor-col-resize'
								{...getGutterProps("column", 1)}
							/>
							<div
								className='col-start-1 col-end-4 row-start-2 row-end-2 cursor-row-resize'
								{...getGutterProps("row", 1)}
							/>
						</div>
					)}
				/>
			</div>
		</div>
	)
}

export default App
