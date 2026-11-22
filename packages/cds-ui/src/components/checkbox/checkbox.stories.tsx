import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import Checkbox from './checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    checked: { description: '선택 여부', control: 'boolean' },
    disabled: { description: '비활성화 상태', control: 'boolean' },
    onChange: { action: 'changed' },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const ControlledCheckbox = () => {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      checked={checked}
      onChange={(e) => setChecked(e.target.checked)}
      aria-label="체크박스"
    />
  );
};

export const Default: Story = {
  render: () => <ControlledCheckbox />,
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1.6rem' }}>
      <Checkbox readOnly aria-label="off" />
      <Checkbox readOnly checked aria-label="on" />
      <Checkbox readOnly disabled aria-label="off · disabled" />
      <Checkbox readOnly checked disabled aria-label="on · disabled" />
    </div>
  ),
};
