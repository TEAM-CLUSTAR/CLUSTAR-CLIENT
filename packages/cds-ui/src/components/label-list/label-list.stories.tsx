// label-list.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { labelColorType } from '../label/label';
import LabelList from './label-list';

type ItemsType = {
  id: number;
  text: string;
  color: labelColorType;
};

const meta: Meta<typeof LabelList> = {
  title: 'Components/LabelList',
  component: LabelList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['dense', 'regular'],
      description:
        'UI 밀도 타입이에요. (사용처 의미를 직접 담진 않지만, 현재는 dense=모달, regular=카드뷰에서 주로 사용돼요.)',
    },
    dateText: {
      control: 'text',
    },
    items: {
      control: 'object',
    },
  },
};

export default meta;

// ✅ 여기 바뀐 부분
type Story = StoryObj<typeof LabelList>;

const sampleItems: ItemsType[] = [
  { id: 1, text: '업무', color: 'blue' },
  { id: 2, text: '회의', color: 'green' },
  { id: 3, text: '중요', color: 'pink' },
];

export const DenseModal: Story = {
  name: 'Dense (Modal)',
  args: {
    type: 'dense',
    dateText: 'YYYY.MM.DD HH:MM PM 생성됨',
    items: sampleItems,
  },
  render: (args) => (
    <div
      style={{
        width: '32rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '1.2rem',
        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
      }}
    >
      <LabelList {...args} />
    </div>
  ),
};

export const RegularCardView: Story = {
  name: 'Regular (CardView)',
  args: {
    type: 'regular',
    items: sampleItems,
  },
  render: (args) => (
    <div
      style={{
        width: '32rem',
        padding: '2rem',
        backgroundColor: '#fff',
        borderRadius: '1.2rem',
        border: '1px solid rgba(0,0,0,0.08)',
      }}
    >
      <LabelList {...args} />
    </div>
  ),
};
