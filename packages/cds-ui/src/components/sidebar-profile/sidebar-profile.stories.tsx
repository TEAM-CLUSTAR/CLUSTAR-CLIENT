import type { Meta, StoryObj } from '@storybook/react';

import SidebarProfile from './sidebar-profile';

const meta: Meta<typeof SidebarProfile> = {
  title: 'Components/SidebarProfile',
  component: SidebarProfile,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
사이드바 하단에 위치하는 **사용자 프로필 요약 컴포넌트**입니다.  
사용자의 아이디와 이메일 정보를 간단하게 표시하는 용도로 사용됩니다.

- \`userId\`: 사용자 아이디
- \`userEmail\`: 사용자 이메일
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    userId: {
      control: 'text',
      description: '사용자 아이디',
    },
    userEmail: {
      control: 'text',
      description: '사용자 이메일',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    userId: 'user123',
    userEmail: 'joerin4177@gmail.com',
  },
};
