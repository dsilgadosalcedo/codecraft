import { Share2 } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SidebarMenuButton } from '@/components/ui/sidebar'

interface ShareDialogProps {
  currentWorkspace: {
    name: string
    html: string
    css: string
    js: string
  }
}

// Helper to base64-encode Unicode strings
function utf8ToBase64(str: string): string {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  )
}

export default function ShareDialog({ currentWorkspace }: ShareDialogProps) {
  const [mode, setMode] = useState<'ro' | 'edit'>('ro')
  const { html, css, js, name } = currentWorkspace
  const json = JSON.stringify({ html, css, js, name })
  const payload = utf8ToBase64(json)
  const baseUrl = window.location.origin
  const shareUrl = `${baseUrl}?share=${encodeURIComponent(
    payload
  )}&mode=${mode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Share Workspace">
          <Share2 className="h-4 w-4 shrink-0" />
          <span>Share</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Workspace</DialogTitle>
        </DialogHeader>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="share-mode"
              checked={mode === 'ro'}
              onChange={() => setMode('ro')}
            />
            Read-only
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="share-mode"
              checked={mode === 'edit'}
              onChange={() => setMode('edit')}
            />
            Editable
          </label>
        </div>
        <textarea
          readOnly
          value={shareUrl}
          className="w-full h-24 p-2 border rounded"
        />
        <DialogFooter>
          <Button onClick={copyToClipboard}>Copy Link</Button>
          <DialogClose>Close</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
