import type { Meta, StoryObj } from '@storybook/react';

import SidebarPannel from './sidebar-pannel';

const meta: Meta<typeof SidebarPannel> = {
  title: 'Components/SidebarPannel',
  component: SidebarPannel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    iconName: {
      description: '기본 상태의 아이콘 이름입니다.',
      control: 'text',
    },
    isSelected: {
      description: '활성화(선택) 상태 여부를 결정합니다.',
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof SidebarPannel>;

export const Default: Story = {
  args: {
    iconName: 'ic_newmemo',
    isSelected: false,
    children: '새 메모',
  },
};

export const Selected: Story = {
  args: {
    iconName: 'ic_newmemo',
    isSelected: true,
    children: '새 메모',
  },
};

export const List: Story = {
  name: '한 눈에 보기',
  render: (args) => (
    <div
      style={{
        width: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}
    >
      <SidebarPannel {...args} isSelected={false}>
        기본 메뉴
      </SidebarPannel>
      <SidebarPannel {...args} isSelected={true}>
        선택된 메뉴
      </SidebarPannel>
    </div>
  ),
  args: {
    iconName: 'ic_newmemo',
  },
};
