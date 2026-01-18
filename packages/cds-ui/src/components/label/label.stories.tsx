import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test'; // 클릭 액션 감지를 위해 추가

import { LabelColorType } from '../../constants/label-color-map';
import Label from './label';

const meta: Meta<typeof Label> = {
  title: 'Components/Label',
  component: Label,
  parameters: {
    layout: 'centered',
    // 컴포넌트 설명 (Autodocs에 표시됨)
    docs: {
      description: {
        component:
          '라벨 컴포넌트입니다. 클릭 이벤트를 지원하며 사이즈와 색상을 조절할 수 있습니다.',
      },
    },
  },
  tags: ['autodocs'],
  // 공통 args 설정: onClick 발생 시 Actions 패널에 로그 출력
  args: {
    onClick: fn(),
  },
  argTypes: {
    labelSize: {
      control: 'radio',
      options: ['sm', 'lg'],
      description: '라벨의 크기를 결정합니다.',
    },
    labelColor: {
      control: 'select',
      options: ['blue', 'purple', 'green', 'pink', 'grey'],

      description: '라벨의 테마 색상을 결정합니다.',
    },
    labelText: {
      control: 'text',
      description: '라벨에 표시될 텍스트입니다.',
    },
    onClick: {
      description: '클릭 시 실행될 함수입니다. (전달 시 cursor: pointer 적용)',
    },
  },
};
export default meta;

type Story = StoryObj<typeof meta>;

// 1. 기본 스토리 (Controls로 조작 가능)
export const Default: Story = {
  args: {
    labelSize: 'sm',
    labelColor: 'grey',
    labelText: '태그 없음',
  },
};

// 2. 인터랙션 확인용 (onClick이 있을 때 스타일 확인)
export const Clickable: Story = {
  args: {
    labelSize: 'lg',
    labelColor: 'blue',
    labelText: '클릭해 보세요',
    // meta.args에 이미 fn()이 있지만, 명시적으로 클릭 가능함을 보여주기 위해 유지
  },
};

// 3. 색상별 사이즈 모음 (render 함수 활용)
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

export const GreySizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
      <Label labelSize="sm" labelColor="grey" labelText="회색 라벨" />
      <Label labelSize="lg" labelColor="grey" labelText="회색 라벨" />
    </div>
  ),
};

// 4. 모든 색상 한눈에 보기 (Gallery)
export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {['blue', 'purple', 'green', 'pink', 'grey'].map((color) => (
        <div
          key={color}
          style={{ display: 'flex', gap: '12px', alignItems: 'center' }}
        >
          <span style={{ width: '60px', fontSize: '12px', color: '#666' }}>
            {color}
          </span>
          <Label
            labelSize="sm"
            labelColor={color as LabelColorType}
            labelText="Small"
          />
          <Label
            labelSize="lg"
            labelColor={color as LabelColorType}
            labelText="Large"
          />
        </div>
      ))}
    </div>
  ),
};
