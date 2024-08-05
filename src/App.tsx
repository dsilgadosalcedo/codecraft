import "./App.css"
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
			render={({ getGridProps, getGutterProps }) => (
				<div className='grid-frame' {...getGridProps()}>
					<Editor id='html' language='html' value={html} onChange={setHtml} />
					<Editor id='css' language='css' value={css} onChange={setCss} />
					<Editor id='js' language='javascript' value={js} onChange={setJs} />
					<Preview code={code} />
					<div
						className='gutter-col cursor-col-resize'
						{...getGutterProps("column", 1)}
					/>
					<div
						className='gutter-row cursor-row-resize'
						{...getGutterProps("row", 1)}
					/>
				</div>
			)}
		/>
	)
}

export default App
