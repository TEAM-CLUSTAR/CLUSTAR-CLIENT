import type { Meta, StoryObj } from '@storybook/react';

import HoverNavItems, { MenuModeProps } from './hover-nav-items';

const meta: Meta<typeof HoverNavItems> = {
  title: 'Components/HoverNavItems/Menu',
  component: HoverNavItems,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLabel: {
      control: false,
    },
    contents: { control: 'text' },
  },
} satisfies Meta<MenuModeProps>;

export default meta;

type Story = StoryObj<MenuModeProps>;

export const Default: Story = {
  args: {
    isLabel: false,
    contents: '마이페이지',
  },
};
