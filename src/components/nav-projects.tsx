import { Download, Github, Upload } from "lucide-react"

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import JSZip from "jszip"
import { useWorkspaceStore } from "@/store/useWorkspaceStore"
import React from "react"

export function NavProjects() {
  const currentWorkspaceId = useWorkspaceStore(
    (state) => state.currentWorkspaceId
  )
  const currentWorkspace = useWorkspaceStore((state) =>
    state.workspaces.find((ws) => ws.id === currentWorkspaceId)
  )
  const createWorkspace = useWorkspaceStore((state) => state.createWorkspace)
  const updateWorkspaceFiles = useWorkspaceStore(
    (state) => state.updateWorkspaceFiles
  )

  if (!currentWorkspace) return null
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleExportZip = async () => {
    const zip = new JSZip()
    zip.file("index.html", currentWorkspace.html)
    zip.file("style.css", currentWorkspace.css)
    zip.file("script.js", currentWorkspace.js)
    const blob = await zip.generateAsync({ type: "blob" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentWorkspace.name || "workspace"}.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleExportGist = async () => {
    const token = prompt("GitHub token for Gist export")
    if (!token) return
    try {
      const res = await fetch("https://api.github.com/gists", {
        method: "POST",
        headers: {
          Authorization: `token ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: `CodeCraft2 Workspace: ${currentWorkspace.name}`,
          public: false,
          files: {
            "index.html": { content: currentWorkspace.html },
            "style.css": { content: currentWorkspace.css },
            "script.js": { content: currentWorkspace.js },
          },
        }),
      })
      const data = await res.json()
      if (data.html_url) {
        window.open(data.html_url, "_blank")
      } else {
        alert("Failed to create gist")
      }
    } catch {
      alert("Error creating gist")
    }
  }

  const handleFileImport = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    try {
      const zip = await JSZip.loadAsync(file)
      const html = await (zip.file("index.html")?.async("string") ??
        Promise.resolve(""))
      const css = await (zip.file("style.css")?.async("string") ??
        Promise.resolve(""))
      const js = await (zip.file("script.js")?.async("string") ??
        Promise.resolve(""))
      createWorkspace("Imported Workspace")
      updateWorkspaceFiles({ html, css, js })
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = ""
      }
    } catch {
      alert("Invalid ZIP file")
    }
  }

  return (
    // group-data-[collapsible=icon]:hidden
    <SidebarGroup>
      <SidebarGroupLabel>Import / Export</SidebarGroupLabel>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleExportZip}
            tooltip={"Export ZIP"}
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4 shrink-0" />
            <span className="truncate">Export ZIP</span>
          </SidebarMenuButton>
        </SidebarMenuItem>

        <SidebarMenuItem>
          <SidebarMenuButton
            onClick={handleExportGist}
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
          onChange={handleFileImport}
        />
      </SidebarMenu>
    </SidebarGroup>
  )
}
