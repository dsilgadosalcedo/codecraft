import React, { useState, useEffect } from "react"
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
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit } from "lucide-react"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"

export default function RenameWorkspaceDialog({
  workspace,
}: {
  workspace: { id: string; name: string }
}) {
  const renameWorkspace = useWorkspaceStore((state) => state.renameWorkspace)
  const [name, setName] = useState(workspace.name)

  useEffect(() => {
    setName(workspace.name)
  }, [workspace.name])

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
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={() => renameWorkspace(workspace.id, name)}>
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
