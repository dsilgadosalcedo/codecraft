import "./App.css"
import { useEffect, useState } from "react"
import * as monaco from "monaco-editor"
import CssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import EditorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import HtmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import JsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import Split from "react-split-grid"
import Editor from "./components/Editor"

const baseCode = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Codecraft project</title>
  <style>
body {
  font-family: sans-serif;
  background-color: black;
  color: lightgray;
}
  </style>
</head>
<body>
	<h1>🥑 Hello</h1> 
</body>
</html>
`

function App() {
	const [code, setCode] = useState(baseCode)

	const [css, setCss] = useState(
		baseCode.split("<style>")[1].split("</style>")[0].trim()
	)
	const [html, setHtml] = useState(
		baseCode.split("<body>")[1].split("</body>")[0].trim()
	)
	const [js, setJs] = useState("")

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

	useEffect(() => {
		window.MonacoEnvironment = {
			getWorker(_, label) {
				switch (label) {
					case "html":
						return new HtmlWorker()
					case "javascript":
						return new JsWorker()
					case "css":
						return new CssWorker()
					default:
						return new EditorWorker()
				}
			},
		}

		const defaultEditorOptions = {
			automaticLayout: true,
			theme: "vs-dark",
			minimap: {
				enabled: false,
			},
			padding: {
				top: 14,
			},
			lineNumbers: "off",
		}

		const htmlEditor = monaco.editor.create(document.getElementById("html"), {
			value: html,
			language: "html",
			...defaultEditorOptions,
		})

		htmlEditor.onDidChangeModelContent(() => {
			setHtml(htmlEditor.getValue())
		})

		const cssEditor = monaco.editor.create(document.getElementById("css"), {
			value: css,
			language: "css",
			...defaultEditorOptions,
		})

		cssEditor.onDidChangeModelContent(() => {
			setCss(cssEditor.getValue())
		})

		const jsEditor = monaco.editor.create(document.getElementById("js"), {
			value: js,
			language: "javascript",
			...defaultEditorOptions,
		})

		jsEditor.onDidChangeModelContent(() => {
			setJs(jsEditor.getValue())
		})
	}, [html, css, js])
	return (
		<Split
			render={({ getGridProps, getGutterProps }) => (
				<div className='grid-frame' {...getGridProps()}>
					<Editor id='html' language='html' value={html} onChange={setHtml} />
					<Editor id='css' language='css' value={css} onChange={setCss} />
					<Editor id='js' language='javascript' value={js} onChange={setJs} />
					<iframe
						id='iframe'
						srcDoc={code}
						className='w-full h-full rounded-xl'
					></iframe>
					<div className='gutter-col' {...getGutterProps("column", 1)} />
					<div className='gutter-row' {...getGutterProps("row", 1)} />
				</div>
			)}
		/>
	)
}

export default App
