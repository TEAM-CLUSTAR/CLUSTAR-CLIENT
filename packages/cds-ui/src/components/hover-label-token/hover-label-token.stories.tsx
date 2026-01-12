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
    labelName: {
      control: 'text',
      description: '버튼 내부에 표시될 텍스트 내용',
    },
  },
} satisfies Meta<typeof HoverLabelToken>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelName: 'Label',
  },
};

export const LongText: Story = {
  args: {
    labelName: '텍스트가 길어질 경우의 테스트입니다',
  },
};
