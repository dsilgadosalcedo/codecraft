/* eslint-disable react-hooks/rules-of-hooks */
import type { Meta, StoryObj } from '@storybook/react'
import React, { useState } from 'react'

import { Button } from '@/components/ui/button'

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from './collapsible'

const meta: Meta<typeof Collapsible> = {
  title: 'UI/Collapsible',
  component: Collapsible,
}
export default meta

type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  render: () => {
    const [open, setOpen] = useState(false)
    return (
      <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button>{open ? 'Hide' : 'Show'} content</Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div style={{ padding: '1rem', background: '#f3f3f3' }}>
            Hidden content goes here.
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
  },
}
