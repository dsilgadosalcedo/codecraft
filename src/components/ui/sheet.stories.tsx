/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './sheet'

// Define props including the custom 'side' prop on SheetContent
type SheetProps = React.ComponentProps<typeof Sheet> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}
const meta: Meta<SheetProps> = {
  title: 'UI/Sheet',
  component: Sheet,
  argTypes: {
    side: { control: 'select', options: ['top', 'right', 'bottom', 'left'] },
  },
}
export default meta

type Story = StoryObj<SheetProps>

export const Default: Story = {
  argTypes: {},
  render: ({ side }) => {
    const [open, setOpen] = useState(false)
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button>Open Sheet</Button>
        </SheetTrigger>
        <SheetContent side={side} className="p-4">
          <SheetHeader>
            <SheetTitle>Sheet Title</SheetTitle>
            <SheetDescription>Sheet from {side}</SheetDescription>
          </SheetHeader>
          <div>Sheet body content here.</div>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetContent>
      </Sheet>
    )
  },
  args: { side: 'right' },
}
