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
사용자의 이름, 이메일, 프로필 이미지 정보를 간단하게 표시하는 용도로 사용됩니다.

- \`name\`: 사용자 이름
- \`email\`: 사용자 이메일
- \`profileImageUrl\`: 프로필 이미지 URL (선택)
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: 'text',
      description: '사용자 이름',
    },
    email: {
      control: 'text',
      description: '사용자 이메일',
    },
    profileImageUrl: {
      control: 'text',
      description: '프로필 이미지 URL',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    name: '조혜린',
    email: 'joerin4177@gmail.com',
  },
};

export const WithProfileImage: Story = {
  args: {
    name: '조혜린',
    email: 'joerin4177@gmail.com',
    profileImageUrl: 'https://via.placeholder.com/36',
  },
};
