const EditorLogo = ({ language }: { language: string }) => {
  const htmlLogo = (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
      <path d="M15.5 8h-7l.5 4h6l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
    </>
  )

  const cssLogo = (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
      <path d="M8.5 8h7l-4.5 4h4l-.5 3.5l-2.5 .75l-2.5 -.75l-.1 -.5" />
    </>
  )

  const jsLogo = (
    <>
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M20 4l-2 14.5l-6 2l-6 -2l-2 -14.5z" />
      <path d="M7.5 8h3v8l-2 -1" />
      <path d="M16.5 8h-2.5a.5 .5 0 0 0 -.5 .5v3a.5 .5 0 0 0 .5 .5h1.423a.5 .5 0 0 1 .495 .57l-.418 2.93l-2 .5" />
    </>
  )

  const getLogo = () => {
    switch (language) {
      case 'html':
        return htmlLogo
      case 'css':
        return cssLogo
      case 'js':
        return jsLogo
      default:
        return null
    }
  }

  return (
    <svg
      className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      width="70"
      height="70"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="#597e8d"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {getLogo()}
    </svg>
  )
}

export default EditorLogo
