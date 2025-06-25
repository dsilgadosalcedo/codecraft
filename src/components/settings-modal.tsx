import React from "react"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { SidebarMenuButton } from "@/components/ui/sidebar"
import { useAiStore } from "../store/useAiStore"
import { Bot } from "lucide-react"

export default function SettingsModal() {
  const apiKey = useAiStore((state) => state.apiKey)
  const model = useAiStore((state) => state.model)
  const provider = useAiStore((state) => state.provider)
  const setApiKey = useAiStore((state) => state.setApiKey)
  const setModel = useAiStore((state) => state.setModel)
  const setProvider = useAiStore((state) => state.setProvider)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton tooltip={"Settings"}>
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
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="sk-..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Model</label>
            <Input
              value={model}
              onChange={(e) => setModel(e.target.value)}
              placeholder="gpt-3.5-turbo"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Provider</label>
            <select
              value={provider}
              onChange={(e) =>
                setProvider(e.target.value as "openai" | "gemini")
              }
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
