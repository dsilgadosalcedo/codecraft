export const initialHtml = `<button>🥑 Say Hello</button>`

export const initialCss = `body {
  background-color: black;
  color: lightgray;
}

button {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: large;
}
`

export const initialJs = `document.querySelector('button').addEventListener(
  'click',
  () => alert('Hello')
)`
