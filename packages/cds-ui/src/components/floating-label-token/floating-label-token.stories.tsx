import type { Meta, StoryObj } from '@storybook/react';

import FloatingLabelToken from './floating-label-token';

const meta: Meta<typeof FloatingLabelToken> = {
  title: 'Components/FloatingLabelToken',
  component: FloatingLabelToken,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: 'text',
      description: '라벨 텍스트',
    },
  },
} satisfies Meta<typeof FloatingLabelToken>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Label',
  },
};

export const LongText: Story = {
  args: {
    children: '텍스트가 길어졌을 때의 테스트',
  },
};
