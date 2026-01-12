import type { Meta, StoryObj } from '@storybook/react';

import HoverNavItems, { LabelModeProps } from './hover-nav-items';

const meta: Meta<typeof HoverNavItems> = {
  title: 'Components/HoverNavItems/Label',
  component: HoverNavItems,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLabel: {
      control: false,
    },
    contents: { control: 'object' },
  },
} satisfies Meta<LabelModeProps>;

export default meta;

type Story = StoryObj<LabelModeProps>;

export const Default: Story = {
  args: {
    isLabel: true,
    contents: [
      { id: 1, name: '자기계발' },
      { id: 2, name: 'SOPT' },
      { id: 3, name: '오스트랄로피테쿠스 일대기' },
    ],
  },
};
