import { Download, Github, Upload } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useImportExport } from "@/features/projects/use-import-export"
import React from "react"

export function NavProjects() {
  const {
    currentWorkspace,
    fileInputRef,
    exportZipHandler,
    exportGistHandler,
    importZipHandler,
  } = useImportExport()

  if (!currentWorkspace) return null

  return (
    // group-data-[collapsible=icon]:hidden
    <SidebarGroup>
      <SidebarGroupLabel>Import / Export</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={exportZipHandler}
            tooltip={"Export ZIP"}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="truncate">Export ZIP</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={exportGistHandler}
            tooltip={"Export Gist"}
            className="flex items-center gap-2"
          >
            <Github className="h-4 w-4 shrink-0" />
            <span className="truncate">Export Gist</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={() => fileInputRef.current?.click()}
            tooltip={"Import ZIP"}
            className="flex items-center gap-2"
          >
            <Upload className="h-4 w-4 shrink-0" />
            <span className="truncate">Import ZIP</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <input
          ref={fileInputRef}
          type="file"
          accept=".zip"
          className="hidden"
          onChange={importZipHandler}
        />
      </SidebarMenu>
    </SidebarGroup>
  )
}
