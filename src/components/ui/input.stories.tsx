import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './input'

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  argTypes: { onChange: { action: 'changed' }, type: { control: 'text' } },
}
export default meta

type Story = StoryObj<typeof Input>

export const Text: Story = {
  args: { placeholder: 'Type here...', type: 'text' },
}
export const Password: Story = {
  args: { placeholder: 'Password', type: 'password' },
}
export const Disabled: Story = {
  args: { placeholder: 'Disabled', disabled: true },
}
