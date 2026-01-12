import type { Meta, StoryObj } from '@storybook/react';

import HoverLabelToken from './hover-label-token';

const meta: Meta<typeof HoverLabelToken> = {
  title: 'Components/HoverLabelToken',
  component: HoverLabelToken,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '토큰 내부에 들어갈 텍스트',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} satisfies Meta<typeof HoverLabelToken>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const LongText: Story = {
  args: {
    children: '텍스트가 아주 길어졌을 때의 테스트입니다',
  },
};
