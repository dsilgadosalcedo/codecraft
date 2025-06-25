"use client"

import { ChevronRight, Folder, FolderOpen, Plus } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import SettingsModal from "./settings-modal"
import TemplateSelector from "./template-selector"
import { useWorkspaceStore } from "../store/useWorkspaceStore"
import RenameWorkspaceDialog from "./rename-workspace-dialog"
import DeleteWorkspaceDialog from "./delete-workspace-dialog"

export function NavMain() {
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace)
  const workspaces = useWorkspaceStore((state) => state.workspaces)
  const currentWorkspaceId = useWorkspaceStore(
    (state) => state.currentWorkspaceId
  )
  const switchWorkspace = useWorkspaceStore((state) => state.switchWorkspace)

  return (
    <>
      <SidebarGroup>
        <SidebarGroupLabel>Workspaces</SidebarGroupLabel>
        <SidebarMenu>
          <Collapsible
            asChild
            defaultOpen={false}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={"Browse Workspaces"}>
                  <FolderOpen />
                  <span>Browse Workspaces</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {workspaces.map((ws) => (
                    <SidebarMenuSubItem
                      key={ws.id}
                      className="flex items-center justify-between"
                    >
                      <SidebarMenuSubButton
                        isActive={ws.id === currentWorkspaceId}
                        onClick={() => switchWorkspace(ws.id)}
                        className="flex items-center gap-2"
                      >
                        {ws.id === currentWorkspaceId ? (
                          <FolderOpen className="h-4 w-4 shrink-0" />
                        ) : (
                          <Folder className="h-4 w-4 shrink-0" />
                        )}
                        <span className="truncate">{ws.name}</span>
                      </SidebarMenuSubButton>
                      <div className="flex items-center gap-1">
                        <RenameWorkspaceDialog workspace={ws} />
                        {workspaces.length > 1 && (
                          <DeleteWorkspaceDialog workspace={ws} />
                        )}
                      </div>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => {
                createWorkspace("New Workspace")
              }}
              tooltip={"New Workspace"}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4 shrink-0" />
              <span className="truncate">New Workspace</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Tools</SidebarGroupLabel>
        <SidebarMenu>
          <SidebarMenuItem>
            <TemplateSelector />
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SettingsModal />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </>
  )
}
