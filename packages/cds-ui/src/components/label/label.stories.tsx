import type { Meta, StoryObj } from '@storybook/react';

import Label from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
  argTypes: {
    labelSize: { control: 'radio', options: ['sm', 'lg'] },
    labelColor: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'gray'],
    },
    labelText: { control: 'text' },
  },
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelSize: 'sm',
    labelColor: 'gray',
    labelText: '태그 없음',
  },
};

export const Small: Story = {
  args: {
    labelSize: 'sm',
    labelColor: 'purple',
    labelText: 'Small Label',
  },
};

export const Large: Story = {
  args: {
    labelSize: 'lg',
    labelColor: 'green',
    labelText: 'Large Label',
  },
};

export const Blue: Story = {
  args: {
    labelSize: 'sm',
    labelColor: 'blue',
    labelText: 'Blue',
  },
};

export const BlueSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="blue" labelText="파란색 라벨" />
      <Label labelSize="lg" labelColor="blue" labelText="파란색 라벨" />
    </div>
  ),
};

export const PurpleSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="purple" labelText="보라색 라벨" />
      <Label labelSize="lg" labelColor="purple" labelText="보라색 라벨" />
    </div>
  ),
};

export const GreenSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="green" labelText="초록색 라벨" />
      <Label labelSize="lg" labelColor="green" labelText="초록색 라벨" />
    </div>
  ),
};

export const PinkSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="pink" labelText="분홍색 라벨" />
      <Label labelSize="lg" labelColor="pink" labelText="분홍색 라벨" />
    </div>
  ),
};

export const GraySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="gray" labelText="회색 라벨" />
      <Label labelSize="lg" labelColor="gray" labelText="회색 라벨" />
    </div>
  ),
};
