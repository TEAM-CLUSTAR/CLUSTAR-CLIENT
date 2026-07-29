/**
 * @deprecated 삭제 예정 파일
 */
// NOTE: 삭제 예정이지만 Tag 도입 밑작업에서 props 타입이 함께 변경되어
// 타입 에러 방지를 위해 최소 범위만 수정
import type { Meta, StoryObj } from '@storybook/react';

import { LabelTextType } from '../../constants/label-color-map';
import LabelList from './label-list';

type ItemsType = {
  id: string;
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
    listType: {
      control: 'radio',
      options: ['modal', 'card'],
      description:
        'UI 밀도 타입이에요. (사용처 의미를 직접 담진 않지만, 현재는 dense=모달, regular=카드뷰에서 주로 사용돼요.)',
    },
    dateText: {
      control: 'text',
    },
    labelItems: {
      control: 'object',
    },
  },
};

export default meta;

type Story = StoryObj<typeof LabelList>;

const sampleItems: ItemsType[] = [
  { id: '1', text: 'SOPT' },
  { id: '2', text: '졸업 프로젝트' },
  { id: '3', text: '레퍼런스' },
  { id: '3', text: '교양' },
];

export const DenseModal: Story = {
  name: 'Dense (Modal)',
  args: {
    listType: 'modal',
    dateText: 'YYYY.MM.DD HH:MM PM 생성됨',
    labelItems: sampleItems,
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
    listType: 'card',
    labelItems: sampleItems,
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
