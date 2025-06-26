import type { Meta, StoryObj } from '@storybook/react'

import { Skeleton } from './skeleton'

const meta: Meta<typeof Skeleton> = {
  title: 'UI/Skeleton',
  component: Skeleton,
  argTypes: { className: { control: false } },
}
export default meta

type Story = StoryObj<typeof Skeleton>

export const Default: Story = { args: { className: 'w-32 h-4' } }
export const Circle: Story = { args: { className: 'rounded-full w-12 h-12' } }
