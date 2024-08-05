import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import { emmetHTML, emmetCSS } from "emmet-monaco-es"

emmetHTML(monaco)
emmetCSS(monaco)

function Editor({
	id,
	language,
	value,
	onChange,
}: {
	id: string
	language: string
	value: string
	onChange: (value: string) => void
}) {
	const editorRef = useRef<monaco.editor.IStandaloneCodeEditor>()

	useEffect(() => {
		const element = document.getElementById(id)

		if (!element) return

		if (!editorRef.current) {
			const editor = monaco.editor.create(element, {
				automaticLayout: true,
				fixedOverflowWidgets: true,
				language,
				lineNumbers: "off",
				minimap: { enabled: false },
				padding: { top: 14 },
				scrollBeyondLastLine: false,
				theme: "vs-dark",
				value,
			})

			editor.onDidChangeModelContent(() => {
				onChange(editor.getValue())
			})

			editorRef.current = editor
		}
	}, [id, language, value, onChange])

	return (
		<div className='overflow-hidden w-full h-full rounded-xl relative'>
			<div id={id} className='w-full h-full'></div>
			<svg
				className='absolute top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 opacity-10'
				xmlns='http://www.w3.org/2000/svg'
				width='70'
				height='70'
				viewBox='0 0 24 24'
				stroke-width='1.5'
				stroke='#597e8d'
				fill='none'
				stroke-linecap='round'
				stroke-linejoin='round'
			>
				{(id === "html" && (
					<>
						<path stroke='none' d='M0 0h24v24H0z' fill='none' />
						<path d='M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z' />
						<path d='M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5' />
					</>
				)) ||
					(id === "css" && (
						<>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z' />
							<path d='M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5' />
						</>
					)) ||
					(id === "js" && (
						<>
							<path stroke='none' d='M0 0h24v24H0z' fill='none' />
							<path d='M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z' />
							<path d='M7.5 8h3v8l-2 -1' />
							<path d='M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5' />
						</>
					))}
			</svg>
		</div>
	)
}

export default Editor
