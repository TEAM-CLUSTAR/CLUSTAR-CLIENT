import { useState } from 'react';
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

- \`inputValue\`: input에 표시될 값
- \`handleChangeInput\`: input 변경 시 호출되는 이벤트 핸들러
        `,
      },
    },
  },
  decorators: [(Story) => <Story />],
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Search>;

export const Default: Story = {
  args: {
    inputValue: '',
    handleChangeInput: () => {},
  },
};

export const WithValue: Story = {
  name: 'WithValue',
  args: {
    inputValue: '회의록',
    handleChangeInput: () => {},
  },
};

export const WithoutValue: Story = {
  name: 'WithoutValue',
  args: {
    inputValue: '',
    handleChangeInput: () => {},
  },
};

export const Interactive: Story = {
  name: 'Interactive',
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');

    return (
      <Search
        inputValue={value}
        handleChangeInput={(e) => setValue(e.target.value)}
      />
    );
  },
};
