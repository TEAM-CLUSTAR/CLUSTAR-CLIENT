import type { Meta, StoryObj } from '@storybook/react';

import Fab from './floating-button.js';

const meta: Meta<typeof Fab> = {
  title: 'Components/Fab',
  component: Fab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isActive: false,
    handleClick: () => {},
  },
};

export const Active: Story = {
  args: {
    isActive: true,
    handleClick: () => {},
  },
};
