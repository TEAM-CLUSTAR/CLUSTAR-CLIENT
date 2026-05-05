import type { Meta, StoryObj } from '@storybook/react';

import TooltipTag from './tooltip-tag';

const meta: Meta<typeof TooltipTag> = {
  title: 'Components/TooltipTag',
  component: TooltipTag,
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
} satisfies Meta<typeof TooltipTag>;

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
