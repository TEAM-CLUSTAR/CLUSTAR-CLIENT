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
    children: {
      control: 'text',
      description: '툴팁 내부에 표시될 내용',
    },
    className: {
      control: false,
      description: '추가 커스텀 클래스',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

// 1. 기본 텍스트
export const Default: Story = {
  args: {
    children: '기본 툴팁입니다',
  },
};

// 2. 멀티 라인
export const MultiLine: Story = {
  args: {
    children: (
      <>
        <div>첫 번째 라인</div>
        <div>두 번째 라인</div>
      </>
    ),
  },
};

// 3. Empty 상태
export const Empty: Story = {
  args: {
    children: null,
  },
};
