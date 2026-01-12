// label-list.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import LabelList, { LabelTextType } from './label-list';

type ItemsType = {
  id: number;
  text: LabelTextType;
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

type Story = StoryObj<typeof LabelList>;

const sampleItems: ItemsType[] = [
  { id: 1, text: '학교' },
  { id: 2, text: '졸업프로젝트' },
  { id: 3, text: '책' },
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
      }}
    >
      <LabelList {...args} />
    </div>
  ),
};
