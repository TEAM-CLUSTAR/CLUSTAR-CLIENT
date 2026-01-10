// src/components/SelectedMemo/SelectedMemo.stories.tsx

import type { Meta, StoryObj } from '@storybook/react';

import SelectedMemo from './selected-memo';

const meta: Meta<typeof SelectedMemo> = {
  title: 'Components/SelectedMemo',
  component: SelectedMemo,
  tags: ['autodocs'],
  argTypes: {
    memoName: {
      control: 'text',
      description: '선택된 메모의 이름',
      defaultValue: '기본 메모',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof SelectedMemo>;

// 기본
export const Default: Story = {
  args: {
    memoName: '선택된 메모',
  },
};

// 긴 텍스트
export const LongText: Story = {
  args: {
    memoName:
      'A Systematic Approach to Modular Front-End Development Using Build-Time CSS Extraction Techniques',
  },
};

// 특수문자나 공백 테스트
export const SpecialCharacters: Story = {
  args: {
    memoName: 'Memo #123 (Project_Final)',
  },
};
