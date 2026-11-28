import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { TagColorType } from '../../constants/tag-color-match';
import Tag from './tag';

const COLORS: TagColorType[] = [
  'grey',
  'rose',
  'orange',
  'amber',
  'lime',
  'green',
  'teal',
  'cyan',
  'sky',
  'violet',
  'magenta',
  'none',
];

const VARIANTS = [
  { size: 'sm', removable: false },
  { size: 'sm', removable: true },
  { size: 'md', removable: false },
  { size: 'md', removable: true },
] as const;

const meta = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    text: '태그',
    color: 'violet',
    size: 'sm',
  },
  argTypes: {
    text: { description: '태그 이름', control: 'text' },
    color: {
      description:
        '태그 색상. grey(AI 결과물 형식)·none(미분류)은 시스템 표시 전용',
      control: 'select',
      options: COLORS,
    },
    size: {
      description: '태그 사이즈 (sm: 최대 너비 120, md: 최대 너비 160)',
      control: 'radio',
      options: ['sm', 'md'],
    },
    onRemove: {
      description:
        '넘기면 삭제 버튼과 hover 상태가 생김. 태그 편집 화면에서만 사용',
    },
  },
} satisfies Meta<typeof Tag>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Removable: Story = {
  args: {
    size: 'md',
    onRemove: fn(),
  },
};

export const LongText: Story = {
  args: {
    text: '프로덕트 디자인 리서치 인사이트',
    color: 'grey',
    onRemove: fn(),
  },
};

export const SystemColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '0.8rem' }}>
      <Tag color="grey" text="요약본" />
      <Tag color="grey" text="정리본" />
      <Tag color="grey" text="구조화" />
      <Tag color="none" text="미분류" />
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${VARIANTS.length}, auto)`,
        gap: '1.2rem 2.4rem',
        alignItems: 'center',
      }}
    >
      {COLORS.flatMap((color) =>
        VARIANTS.map(({ size, removable }) => (
          <Tag
            key={`${color}-${size}-${removable}`}
            text={color}
            color={color}
            size={size}
            onRemove={removable ? fn() : undefined}
          />
        )),
      )}
    </div>
  ),
};
