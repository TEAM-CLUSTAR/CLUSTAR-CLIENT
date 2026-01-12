import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import SidebarPannel from './sidebar-pannel';

const meta: Meta<typeof SidebarPannel> = {
  title: 'Components/SidebarPannel',
  component: SidebarPannel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: '렌더링할 아이콘 컴포넌트입니다.',
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
    icon: <Icon name="ic_newmemo" width={36} height={36} />,
    isSelected: false,
    children: '새 메모',
  },
};

export const Selected: Story = {
  args: {
    icon: <Icon name="ic_newmemo_blue" width={36} height={36} />,
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
      <SidebarPannel
        {...args}
        isSelected={false}
        icon={<Icon name="ic_newmemo" width={36} height={36} />}
      >
        새 메모
      </SidebarPannel>

      <SidebarPannel
        {...args}
        isSelected={true}
        icon={<Icon name="ic_allmemo_blue" width={36} height={36} />}
      >
        전체 메모
      </SidebarPannel>

      <SidebarPannel
        {...args}
        isSelected={false}
        icon={<Icon name="ic_ai" width={36} height={36} />}
      >
        AI 기록
      </SidebarPannel>

      <SidebarPannel
        {...args}
        isSelected={false}
        icon={<Icon name="ic_label" width={36} height={36} />}
      >
        Label
      </SidebarPannel>
    </div>
  ),
};
