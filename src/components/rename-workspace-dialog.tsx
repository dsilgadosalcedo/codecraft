import { Edit } from 'lucide-react'
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
import { useRenameWorkspace } from '@/features/workspace/use-rename-workspace'

export default function RenameWorkspaceDialog({
  workspace,
}: {
  workspace: { id: string; name: string }
}) {
  const { name, setName, save } = useRenameWorkspace(
    workspace.name,
    workspace.id
  )

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Rename Workspace">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Workspace</DialogTitle>
          <DialogDescription>
            Enter a new name for the workspace.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <Input value={name} onChange={e => setName(e.target.value)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={save}>Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
