import type { Meta, StoryObj } from '@storybook/react';

import Title from './title';

const meta: Meta<typeof Title> = {
  title: 'Components/Title',
  component: Title,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '타이틀로 표시할 텍스트입니다.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * 기본 Title 컴포넌트입니다.
 * 가장 기본적인 타이틀 텍스트 렌더링 예시입니다.
 */
export const Default: Story = {
  args: {
    title: '제목입니다',
  },
};

export const LongText: Story = {
  args: {
    title:
      'A Systematic Approach to Modular Front-End Development Using Build-Time CSS Extraction Techniques',
  },
  decorators: [
    (Story) => (
      <div
        style={{
          margin: '2rem',
          width: '28rem',
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '8px',
          padding: '1rem',
        }}
      >
        <Story />
      </div>
    ),
  ],
};
