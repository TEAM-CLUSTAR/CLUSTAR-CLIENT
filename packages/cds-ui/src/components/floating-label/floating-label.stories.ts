import type { Meta, StoryObj } from '@storybook/react';

import FloatingLabel from './floating-label';

const meta: Meta<typeof FloatingLabel> = {
  title: 'Components/FloatingLabel',
  component: FloatingLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    labels: {
      control: 'object',
    },
  },
} satisfies Meta<typeof FloatingLabel>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labels: [
      { id: 1, name: 'SOPT' },
      { id: 2, name: 'Web' },
      { id: 3, name: 'Frontend' },
    ],
  },
};

export const ManyLabels: Story = {
  args: {
    labels: [
      { id: 1, name: 'React' },
      { id: 2, name: 'Vue' },
      { id: 3, name: 'Angular' },
      { id: 4, name: 'Svelte' },
      { id: 5, name: 'Next.js' },
      { id: 6, name: 'Remix' },
      { id: 7, name: 'Gatsby' },
      { id: 8, name: 'TypeScript' },
    ],
  },
};

export const Empty: Story = {
  args: {
    labels: [],
  },
};
