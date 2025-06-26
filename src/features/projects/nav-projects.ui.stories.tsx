import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { SidebarProvider } from '@/components/ui/sidebar'

import NavProjectsUI from './nav-projects.ui'

const meta: Meta<typeof NavProjectsUI> = {
  title: 'Features/Projects/NavProjectsUI',
  component: NavProjectsUI,
  decorators: [Story => <SidebarProvider>{<Story />}</SidebarProvider>],
  args: {
    currentWorkspace: { id: '1', name: 'Demo', html: '', css: '', js: '' },
    fileInputRef: {
      current: { click: () => {} },
    } as React.RefObject<HTMLInputElement>,
    exportZipHandler: async () => {},
    exportGistHandler: async () => {},
    importZipHandler: async (_event: React.ChangeEvent<HTMLInputElement>) => {},
  },
}
export default meta

type Story = StoryObj<typeof NavProjectsUI>

export const Default: Story = {}
