import type { Meta, StoryObj } from '@storybook/react';

import Sidebar from './sidebar';

const meta: Meta<typeof Sidebar> = {
  title: 'Global/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    userId: {
      control: 'text',
    },
    userEmail: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: '큰랍스타',
    userEmail: 'biglobster@example.com',
  },
};

export const LongProfileText: Story = {
  args: {
    userId: '매우긴닉네임을가진사용자',
    userEmail: 'very.long.email.address.test@example.com',
  },
};
