'use client'

import React from 'react'

import { useNavMain } from '@/hooks/use-nav-main'

import NavMainUI from './nav-main.ui'

export function NavMain() {
  const { workspaces, currentWorkspaceId, createWorkspace, switchWorkspace } =
    useNavMain()

  return (
    <NavMainUI
      workspaces={workspaces}
      currentWorkspaceId={currentWorkspaceId}
      createWorkspace={createWorkspace}
      switchWorkspace={switchWorkspace}
    />
  )
}
