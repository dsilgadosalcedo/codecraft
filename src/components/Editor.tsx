import { emmetHTML, emmetCSS } from "emmet-monaco-es"
import { useEffect, useRef } from "react"
import * as monaco from "monaco-editor"
import EditorLogo from "./EditorLogo"

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
				tabSize: 2,
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
		<div className='overflow-hidden w-full h-full rounded-xl relative border border-green-400/30'>
			<div id={id} className='w-full h-full'></div>
			<EditorLogo language={id} />
		</div>
	)
}

export default Editor
