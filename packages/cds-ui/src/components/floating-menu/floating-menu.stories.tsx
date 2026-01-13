import type { Meta, StoryObj } from '@storybook/react';

import FloatingMenu from './floating-menu';

const meta: Meta<typeof FloatingMenu> = {
  title: 'Components/FloatingMenu',
  component: FloatingMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    menuName: {
      control: 'text',
    },
  },
} satisfies Meta<typeof FloatingMenu>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    menuName: '메뉴 이름',
  },
};

export const LongText: Story = {
  args: {
    menuName: '길어진 메뉴 이름 테스트',
  },
};
