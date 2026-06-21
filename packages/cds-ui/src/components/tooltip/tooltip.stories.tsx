import type { Meta, StoryObj } from '@storybook/react';

import Tooltip from './tooltip';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '툴팁 제목',
    },
    description: {
      control: 'text',
      description: '툴팁 설명 (선택)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '기본 툴팁입니다',
  },
};

export const WithDescription: Story = {
  args: {
    title: '툴팁 제목',
    description: '툴팁 설명입니다',
  },
};

export const TitleOnly: Story = {
  args: {
    title: '설명 없는 툴팁',
  },
};
