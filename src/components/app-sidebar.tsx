import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import ModeToggle from "./mode-toggle"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center justify-between bg-background rounded-lg p-2 group-data-[collapsible=icon]:p-0">
            <div className="grid flex-1 text-left text-sm leading-tight">
              <WorkspaceName />
              {/* <span className="truncate text-xs">Manage your work spaces</span> */}
            </div>
            <SidebarTrigger />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavProjects />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

const WorkspaceName = () => {
  const currentWorkspaceId = useWorkspaceStore(
    (state) => state.currentWorkspaceId
  )
  const workspace = useWorkspaceStore((state) =>
    state.workspaces.find((workspace) => workspace.id === currentWorkspaceId)
  )
  const workspaceName = workspace?.name

  return (
    <span className="truncate font-medium group-data-[collapsible=icon]:hidden">
      {workspaceName}
    </span>
  )
}
