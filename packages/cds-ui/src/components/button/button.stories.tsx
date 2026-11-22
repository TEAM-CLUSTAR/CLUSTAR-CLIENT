import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import Button from './button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { description: '버튼 라벨', control: 'text' },
    size: {
      description: '버튼 사이즈',
      control: 'select',
      options: ['sm', 'md'],
    },
    variant: {
      description: '버튼 스타일',
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    disabled: { description: '비활성화 상태', control: 'boolean' },
    onClick: { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: '버튼',
    size: 'sm',
    variant: 'primary',
  },
};

export const WithIcon: Story = {
  args: {
    children: '버튼',
    size: 'md',
    variant: 'primary',
    icon: <Icon name="ic_plus" size={20} color="white" />,
  },
};

const VARIANTS = ['primary', 'secondary', 'ghost', 'danger'] as const;
const SIZES = ['sm', 'md'] as const;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.6rem' }}>
      {VARIANTS.map((variant) =>
        SIZES.map((size) => (
          <div
            key={`${variant}-${size}`}
            style={{ display: 'flex', gap: '1.6rem' }}
          >
            <Button variant={variant} size={size}>
              버튼
            </Button>
            <Button variant={variant} size={size} disabled>
              버튼
            </Button>
          </div>
        )),
      )}
    </div>
  ),
};
