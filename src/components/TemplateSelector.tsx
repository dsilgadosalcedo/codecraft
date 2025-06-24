import React, { useState, useEffect } from 'react'
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useWorkspaceStore } from '../store/useWorkspaceStore'

interface Template {
  name: string
  description?: string
  files: { html: string; css: string; js: string }
}

const builtInTemplates: Template[] = [
  {
    name: 'Landing Page',
    description: 'Simple landing page layout',
    files: { html: '<h1>Welcome</h1>', css: 'h1 { color: blue; }', js: '' },
  },
  {
    name: 'Blog Post',
    description: 'Blog post layout',
    files: { html: '<article><h1>Title</h1><p>Content</p></article>', css: 'article { font-family: serif; }', js: '' },
  },
  {
    name: 'Vue Starter',
    description: 'Vue app starter',
    files: { html: '<div id="app">{{ message }}</div>', css: '', js: 'const app = Vue.createApp({ data() { return { message: "Hello Vue!" } } }).mount("#app")' },
  },
]

export default function TemplateSelector() {
  const createWorkspace = useWorkspaceStore(state => state.createWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(state => state.updateWorkspaceFiles)
  const [customTemplates, setCustomTemplates] = useState<Template[]>([])

  useEffect(() => {
    const stored = localStorage.getItem('customTemplates')
    if (stored) setCustomTemplates(JSON.parse(stored))
  }, [])

  const saveCustomTemplate = () => {
    const name = prompt('Template name')
    if (!name) return
    const state = useWorkspaceStore.getState()
    const current = state.workspaces.find(ws => ws.id === state.currentWorkspaceId)
    if (!current) return
    const newTemplate: Template = { name, description: '', files: { html: current.html, css: current.css, js: current.js } }
    const updated = [...customTemplates, newTemplate]
    setCustomTemplates(updated)
    localStorage.setItem('customTemplates', JSON.stringify(updated))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Templates</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Template Library</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {[...builtInTemplates, ...customTemplates].map((tmpl, idx) => (
            <div key={idx} className="border p-4 rounded space-y-2">
              <h3 className="font-semibold">{tmpl.name}</h3>
              <p className="text-sm">{tmpl.description}</p>
              <Button onClick={() => { createWorkspace(tmpl.name); updateWorkspaceFiles(tmpl.files) }}>
                Use Template
              </Button>
            </div>
          ))}
        </div>
        <DialogFooter className="space-x-2">
          <Button onClick={saveCustomTemplate}>Save Current as Template</Button>
          <DialogClose asChild>
            <Button>Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 