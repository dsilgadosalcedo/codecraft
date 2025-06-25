import { LayoutTemplate } from 'lucide-react' // Add an icon from lucide-react

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { SidebarMenuButton } from '@/components/ui/sidebar'

import { Template } from './built-in-templates'

export interface TemplateSelectorUIProps {
  templates: Template[]
  onSaveCustom: () => void
  onSelect: (template: Template) => void
}

export default function TemplateSelectorUI({
  templates,
  onSaveCustom,
  onSelect,
}: TemplateSelectorUIProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <LayoutTemplate />
          Templates
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-full max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Select Template</DialogTitle>
          <DialogDescription className="sr-only">
            Select a template to start
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {templates.map(template => (
            <div
              key={template.name}
              className="group relative border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all cursor-pointer bg-card"
              onClick={() => onSelect(template)}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 text-primary">
                  {template.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {template.name}
                  </h3>
                  {template.category && (
                    <span className="inline-block text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full mt-1">
                      {template.category}
                    </span>
                  )}
                </div>
              </div>

              {template.description && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {template.description}
                </p>
              )}

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
            </div>
          ))}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onSaveCustom}
            className="w-full sm:w-auto"
          >
            Save Current as Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
