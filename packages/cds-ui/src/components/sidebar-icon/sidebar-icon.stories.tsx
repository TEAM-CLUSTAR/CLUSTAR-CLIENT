import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import SidebarIcon from './sidebar-icon';

const meta: Meta<typeof SidebarIcon> = {
  title: 'Components/SidebarIcon',
  component: SidebarIcon,
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
type Story = StoryObj<typeof SidebarIcon>;

export const Default: Story = {
  args: {
    icon: <Icon name="ic_newmemo" width={36} height={36} />,
    isSelected: false,
  },
};

export const Selected: Story = {
  args: {
    icon: <Icon name="ic_newmemo_blue" width={36} height={36} />,
    isSelected: true,
  },
};

export const List: Story = {
  name: '한 눈에 보기',
  render: (args) => (
    <div
      style={{
        display: 'flex',
        gap: '8px',
      }}
    >
      <SidebarIcon
        {...args}
        isSelected={false}
        icon={<Icon name="ic_newmemo" width={36} height={36} />}
      />

      <SidebarIcon
        {...args}
        isSelected={true}
        icon={<Icon name="ic_allmemo_blue" width={36} height={36} />}
      />

      <SidebarIcon
        {...args}
        isSelected={false}
        icon={<Icon name="ic_ai" width={36} height={36} />}
      />

      <SidebarIcon
        {...args}
        isSelected={false}
        icon={<Icon name="ic_label" width={36} height={36} />}
      />
    </div>
  ),
};
