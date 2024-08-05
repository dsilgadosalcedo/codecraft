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
		<div id={id} className='overflow-hidden w-full h-full rounded-xl'></div>
	)
}

export default Editor
