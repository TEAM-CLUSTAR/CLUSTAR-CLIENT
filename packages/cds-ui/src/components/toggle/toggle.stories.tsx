import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import Toggle from './toggle';

const meta: Meta = {
  title: 'Components/Toggle',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

type ViewType = 'tree' | 'card';

const DefaultToggle = () => {
  const [viewMode, setViewMode] = useState<ViewType>('tree');

  const handleChange = (value: string) => {
    setViewMode(value as ViewType);
  };

  return (
    <Toggle selectedValue={viewMode} handleValueChange={handleChange}>
      <Toggle.Item itemValue="tree">
        <Icon
          name={viewMode === 'tree' ? 'ic_treeview_on' : 'ic_treeview_off'}
          size={28}
        />
      </Toggle.Item>
      <Toggle.Item itemValue="card">
        <Icon
          name={viewMode === 'card' ? 'ic_cardview_on' : 'ic_cardview_off'}
          size={28}
        />
      </Toggle.Item>
    </Toggle>
  );
};

/**
 * 기본 Toggle 컴포넌트입니다.
 * 트리뷰와 카드뷰를 전환하는 토글 예시입니다.
 */
export const Default: Story = {
  render: () => <DefaultToggle />,
};

type ThemeType = 'light' | 'dark';

const ThemeToggleComponent = () => {
  const [theme, setTheme] = useState<ThemeType>('light');

  const handleChange = (value: string) => {
    setTheme(value as ThemeType);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>현재 테마: {theme}</div>
      <Toggle selectedValue={theme} handleValueChange={handleChange}>
        <Toggle.Item itemValue="light">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            ☀️
          </div>
        </Toggle.Item>
        <Toggle.Item itemValue="dark">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            🌙
          </div>
        </Toggle.Item>
      </Toggle>
    </div>
  );
};

/**
 * 다른 타입의 토글 예시입니다.
 * 라이트/다크 모드를 전환하는 토글입니다.
 */
export const ThemeToggle: Story = {
  render: () => <ThemeToggleComponent />,
};
