import React from 'react'

export interface PreviewProps {
  code: string
}

export default function Preview({ code }: PreviewProps) {
  return (
    <iframe
      srcDoc={code}
      className="w-full h-[calc(100vh-64px)] md:h-full rounded-xl"
      title="Preview"
    />
  )
}
