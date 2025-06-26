import type { Meta, StoryObj } from '@storybook/react'

import Preview from './preview'

const meta: Meta<typeof Preview> = {
  title: 'Features/Preview',
  component: Preview,
  args: { code: '<h1>Hello, Storybook!</h1>' },
}
export default meta

type Story = StoryObj<typeof Preview>

export const Default: Story = {}
