import type { Meta, StoryObj } from '@storybook/react'

import EditorUI from './editor.ui'

const meta: Meta<typeof EditorUI> = {
  title: 'Features/Editor/EditorUI',
  component: EditorUI,
  args: { id: 'html' },
}
export default meta

type Story = StoryObj<typeof EditorUI>

export const HTML: Story = {}
export const CSS: Story = { args: { id: 'css' } }
export const JavaScript: Story = { args: { id: 'js' } }
