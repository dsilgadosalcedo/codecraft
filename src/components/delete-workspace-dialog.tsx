import { Trash2 } from 'lucide-react'
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
import { useDeleteWorkspace } from '@/features/workspace/use-delete-workspace'

export default function DeleteWorkspaceDialog({
  workspace,
}: {
  workspace: { id: string; name: string }
}) {
  const { deleteWorkspace } = useDeleteWorkspace(workspace.id)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Delete Workspace">
          <Trash2 className="h-4 w-4 text-red-600" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the workspace{' '}
            <strong>{workspace.name}</strong>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="destructive" onClick={deleteWorkspace}>
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
