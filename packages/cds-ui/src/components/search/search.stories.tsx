import type { Meta, StoryObj } from '@storybook/react';

import Search from './search';

const meta: Meta<typeof Search> = {
  title: 'Components/Search',
  component: Search,
  parameters: {
    layout: 'centered',
    componentSubtitle: '검색 입력 컴포넌트',
    docs: {
      description: {
        component: `
Search 컴포넌트는 아이콘과 입력창으로 구성된 검색 UI입니다.
        `,
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {};
