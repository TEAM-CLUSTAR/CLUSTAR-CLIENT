import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '100%', maxWidth: '100%' }}>
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    children: { description: '버튼 내부 내용', control: 'text' },
    size: {
      description: '버튼 사이즈',
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
    variant: {
      description: '버튼 스타일',
      control: 'select',
      options: ['solid', 'outlined'],
    },
    disabled: {
      description: '비활성화 상태 (sm 사이즈만 사용)',
      control: 'boolean',
    },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Small: Story = {
  args: {
    size: 'sm',
    children: <Icon name="ic_send" />,
  },
};

export const MediumSolid: Story = {
  args: {
    size: 'md',
    variant: 'solid',
    children: '메모로 저장하기',
  },
};

export const MediumOutlined: Story = {
  args: {
    size: 'md',
    variant: 'outlined',
    children: '재생성하기',
  },
};

export const LargeSolid: Story = {
  args: {
    size: 'lg',
    variant: 'solid',
    children: '저장하기',
  },
};

export const LargeOutlined: Story = {
  args: {
    size: 'lg',
    variant: 'outlined',
    children: '취소',
  },
};

export const ExtraLarge: Story = {
  args: {
    size: 'xl',
    children: 'AI 생성 하기',
  },
};

export const SmallDisabled: Story = {
  args: {
    size: 'sm',
    children: <Icon name="ic_send" />,
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h3>Small</h3>
        <Button
          size="sm"
          children={<Icon name="ic_send" />}
          onClick={() => {}}
        />
      </div>
      <div>
        <h3>Medium</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="md" variant="solid" onClick={() => {}}>
            메모로 저장하기
          </Button>
          <Button size="md" variant="outlined" onClick={() => {}}>
            재생성하기
          </Button>
        </div>
      </div>
      <div>
        <h3>Large</h3>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <Button size="lg" onClick={() => {}}>
            저장하기
          </Button>
          <Button size="lg" variant="outlined" onClick={() => {}}>
            취소하기
          </Button>
        </div>
      </div>
      <div>
        <h3>Extra Large</h3>
        <div style={{ width: '100%', maxWidth: '40rem' }}>
          <Button size="xl" onClick={() => {}}>
            AI 생성 하기
          </Button>
        </div>
      </div>
    </div>
  ),
};
