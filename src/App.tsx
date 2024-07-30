import "./App.css"
import { useEffect, useState } from "react"
import Split from "react-split-grid"

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
	<h1>🥑 Hello </h1> 
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
          <script>${js}</script>
        </body>
      </html>
    `)
	}, [html, css, js])
	return (
		<Split
			render={({ getGridProps, getGutterProps }) => (
				<div className='grid-frame' {...getGridProps()}>
					<textarea
						className='p-4 font-mono outline-none overflow-hidden resize-none h-full w-full rounded-xl overflow-y-auto'
						id='html'
						name='html'
						onInput={(e) => setHtml(e.target.value)}
						value={html}
					></textarea>
					<textarea
						className='p-4 font-mono outline-none overflow-hidden resize-none h-full w-full rounded-xl overflow-y-auto'
						id='css'
						name='css'
						onInput={(e) => setCss(e.target.value)}
						value={css}
					></textarea>
					<textarea
						className='p-4 font-mono outline-none overflow-hidden resize-none h-full w-full rounded-xl'
						id='js'
						name='js'
						onInput={(e) => setJs(e.target.value)}
						value={js}
					></textarea>
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
