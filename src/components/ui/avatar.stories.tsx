import type { Meta, StoryObj } from '@storybook/react'
import React from 'react'

import { Avatar, AvatarFallback, AvatarImage } from './avatar'

const meta: Meta<typeof Avatar> = {
  title: 'UI/Avatar',
  component: Avatar,
}
export default meta

type Story = StoryObj<typeof Avatar>

export const Fallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>AB</AvatarFallback>
    </Avatar>
  ),
}

export const WithImage: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://via.placeholder.com/150" alt="Placeholder" />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  ),
}
