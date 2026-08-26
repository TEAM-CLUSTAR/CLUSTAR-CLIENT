import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import HoverTooltip from './hover-tooltip';

const meta: Meta<typeof HoverTooltip> = {
  title: 'Components/HoverTooltip',
  component: HoverTooltip,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ paddingTop: '3rem', paddingLeft: '3rem' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: '툴팁 제목',
    },
    description: {
      control: 'text',
      description: '툴팁 설명 (선택)',
    },
    children: {
      description: '호버하면 툴팁을 띄우는 트리거 엘리먼트',
      control: false,
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: '사진 및 파일 업로드',
    children: <Icon name="ic_plus" size={24} color="grey700" />,
  },
};

export const WithDescription: Story = {
  args: {
    title: '메모 삭제하기',
    description: '삭제된 메모는 다시 복구할 수 없어요',
    children: <Icon name="ic_trash" size={24} color="grey700" />,
  },
};
