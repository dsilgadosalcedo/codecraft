import { initialHtml, initialCss, initialJs } from "./utils/initialCode"
import { setupMonacoEnvironment } from "./utils/monacoSetup"
import { useEffect, useState } from "react"
import Editor from "./components/Editor"
import Preview from "./components/Preview"
import Split from "react-split-grid"

function App() {
	const [html, setHtml] = useState(initialHtml)
	const [css, setCss] = useState(initialCss)
	const [js, setJs] = useState(initialJs)
	const [code, setCode] = useState("")

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
		<Split
			// @ts-expect-error ts-migrate(2339)
			render={({ getGridProps, getGutterProps }) => (
				<div
					className='grid h-screen grid-rows-[1fr_6px_1fr] grid-cols-[1fr_6px_1fr]'
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
	)
}

export default App
