import type { Meta, StoryObj } from '@storybook/react';

import PageTitle from './page-title';

const meta: Meta<typeof PageTitle> = {
  title: 'Components/PageTitle',
  component: PageTitle,
  tags: ['autodocs'],
  argTypes: {
    title: {
      description: '페이지의 메인 제목입니다.',
      control: 'text',
    },
    count: {
      description: '제목 옆 배지에 표시될 개수입니다.',
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageTitle>;

export const Default: Story = {
  args: {
    title: '전체 메모',
    count: 24,
  },
};

export const LargeCount: Story = {
  args: {
    title: '전체 메모',
    count: 1,
  },
};

export const TitleOnly: Story = {
  args: {
    title: '전체 메모',
    count: 0,
  },
};
