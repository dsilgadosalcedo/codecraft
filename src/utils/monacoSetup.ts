import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import JsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

export function setupMonacoEnvironment() {
  window.MonacoEnvironment = {
    getWorker(_, label) {
      switch (label) {
        case 'html':
          return new HtmlWorker()
        case 'javascript':
          return new JsWorker()
        case 'css':
          return new CssWorker()
        default:
          return new EditorWorker()
      }
    },
  }
}
