import type { Meta, StoryObj } from '@storybook/react';

import Tag from './tag';

const meta = {
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
    variant: {
      description:
        '태그 스타일 (fill: 팔레트 색 채움, outlined: AI 배지 - 파란 테두리, sm/lg 둘 다 가능하나 삭제 불가)',
      control: 'select',
      options: ['fill', 'outlined'],
    },
    color: {
      description:
        '태그 색상 (팔레트 색상명). fill 변형에서만 사용, 팔레트에 없는 값은 기본 스타일로 표시됨',
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
      ],
    },
    text: { description: '태그 텍스트', control: 'text' },
    action: {
      description: '삭제 아이콘 노출 여부',
      control: 'select',
      options: ['none', 'remove'],
    },
    onRemove: { action: 'removed' },
  },
} satisfies Meta<typeof Tag>;

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
    action: 'remove',
    onRemove: () => {},
  },
};

export const Outlined: Story = {
  args: {
    size: 'lg',
    variant: 'outlined',
    text: 'AI 결과물',
  },
};

export const OutlinedSmall: Story = {
  args: {
    size: 'sm',
    variant: 'outlined',
    text: 'AI 결과물',
  },
};

export const AllColors = {
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
      <Tag variant="outlined" size="lg" text="AI 결과물" />
    </div>
  ),
};
