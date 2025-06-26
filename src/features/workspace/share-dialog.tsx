import { Check, CopyIcon, Share2 } from 'lucide-react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SidebarMenuButton } from '@/components/ui/sidebar'
import { utf8ToBase64 } from '@/lib/utils'

interface ShareDialogProps {
  currentWorkspace: {
    name: string
    html: string
    css: string
    js: string
  }
}

export default function ShareDialog({ currentWorkspace }: ShareDialogProps) {
  const [mode, setMode] = useState<'ro' | 'edit'>('edit')
  const [copied, setCopied] = useState(false)
  const { html, css, js, name } = currentWorkspace
  const json = JSON.stringify({ html, css, js, name })
  const payload = utf8ToBase64(json)
  const baseUrl = window.location.origin
  const shareUrl = `${baseUrl}?share=${encodeURIComponent(
    payload
  )}&mode=${mode}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
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
          <DialogDescription>
            Copy this link to share your workspace as read-only or editable.
          </DialogDescription>
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
          aria-label="Share URL"
          className="w-full h-24 p-2 border rounded"
        />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={copyToClipboard}>
            {copied ? (
              <>
                <Check className="h-4 w-4 shrink-0" />
                <span className="ml-2">Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon className="h-4 w-4 shrink-0" />
                <span className="ml-2">Copy Link</span>
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
