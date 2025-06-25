import { Bot } from 'lucide-react'
import React from 'react'

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
import { Input } from '@/components/ui/input'
import { SidebarMenuButton } from '@/components/ui/sidebar'

export interface SettingsModalUIProps {
  apiKey: string
  model: string
  provider: 'openai' | 'gemini'
  setApiKey: (key: string) => void
  setModel: (model: string) => void
  setProvider: (provider: 'openai' | 'gemini') => void
}

export default function SettingsModalUI({
  apiKey,
  model,
  provider,
  setApiKey,
  setModel,
  setProvider,
}: SettingsModalUIProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip="Settings">
          <Bot />
          Model
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>AI Settings</DialogTitle>
          <DialogDescription>
            Enter your API key and select model.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <label className="block text-sm font-medium mb-1">API Key</label>
            <Input
              type="password"
              value={apiKey}
              onChange={e => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <Input
              value={model}
              onChange={e => setModel(e.target.value)}
              placeholder="gpt-3.5-turbo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select
              value={provider}
              onChange={e => setProvider(e.target.value as 'openai' | 'gemini')}
              className="block w-full rounded border px-2 py-1"
            >
              <option value="openai">OpenAI</option>
              <option value="gemini">Gemini</option>
            </select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
