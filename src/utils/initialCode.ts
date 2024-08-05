export const initialHtml = `<button>🥑 Say Hello</button>`

export const initialCss = `body {
  background-color: #111;
  color: lightgray;
}

button {
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: large;
}
`

export const initialJs = `document.querySelector('button').addEventListener(
  'click',
  () => alert('Hello')
)`
