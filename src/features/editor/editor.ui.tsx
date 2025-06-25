import React from 'react'

import EditorLogo from '@/components/editor-logo'

export interface EditorUIProps {
  id: string
}

export default function EditorUI({ id }: EditorUIProps) {
  return (
    <div className="overflow-hidden w-full h-96 md:h-full rounded-xl relative border border-green-400/30">
      <div id={id} className="w-full h-full"></div>
      <EditorLogo language={id} />
    </div>
  )
}
