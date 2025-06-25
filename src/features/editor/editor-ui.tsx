import React from "react"
import EditorLogo from "@/components/editor-logo"

interface EditorUIProps {
  id: string
  containerRef: React.RefObject<HTMLDivElement | null>
}

export default function EditorUI({ id, containerRef }: EditorUIProps) {
  return (
    <div className="overflow-hidden w-full h-96 md:h-full rounded-xl relative border border-green-400/30">
      <div id={id} ref={containerRef} className="w-full h-full"></div>
      <EditorLogo language={id} />
    </div>
  )
}
