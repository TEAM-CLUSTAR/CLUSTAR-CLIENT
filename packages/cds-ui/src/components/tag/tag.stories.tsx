import type { Meta, StoryObj } from '@storybook/react';

import Tag from './tag';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      description: '태그 사이즈',
      control: 'select',
      options: ['sm', 'lg'],
    },
    color: {
      description:
        '태그 색상 (팔레트 색상명 또는 ai). 팔레트에 없는 값은 기본 스타일로 표시됨',
      control: 'select',
      options: [
        undefined,
        'pink',
        'red',
        'orange',
        'yellow',
        'green',
        'cyan',
        'light-blue',
        'blue',
        'purple',
        'magenta',
        'ai',
      ],
    },
    text: { description: '태그 텍스트', control: 'text' },
    onRemove: { action: 'removed' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'blue',
    text: '클러스타',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'green',
    text: '클러스타',
  },
};

export const Removable: Story = {
  args: {
    size: 'lg',
    color: 'purple',
    text: '클러스타',
    onRemove: () => {},
  },
};

export const Ai: Story = {
  args: {
    size: 'lg',
    color: 'ai',
    text: 'AI 결과물',
  },
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
      {(
        [
          'pink',
          'red',
          'orange',
          'yellow',
          'green',
          'cyan',
          'light-blue',
          'blue',
          'purple',
          'magenta',
        ] as const
      ).map((color) => (
        <Tag key={color} size="lg" color={color} text={color} />
      ))}
      <Tag color="ai" size="lg" text="AI 결과물" />
    </div>
  ),
};
