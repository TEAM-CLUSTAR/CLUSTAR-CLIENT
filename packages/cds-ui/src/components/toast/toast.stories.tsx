import type { Meta, StoryObj } from '@storybook/react';

import Toast from './toast';

const meta: Meta<typeof Toast> = {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['info', 'success', 'error'],
      description: '토스트 종류 (아이콘이 달라져요)',
    },
    message: {
      control: 'text',
      description: '토스트 메시지',
    },
    action: {
      control: 'object',
      description: '액션 버튼 (선택)',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: {
    type: 'info',
    message: '안내 메시지예요',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
    message: '메모를 저장했어요',
  },
};

export const Error: Story = {
  args: {
    type: 'error',
    message: '저장에 실패했어요',
  },
};

export const WithAction: Story = {
  args: {
    type: 'success',
    message: '메모를 삭제했어요',
    action: {
      text: '되돌리기',
      onClick: () => {},
    },
  },
};
