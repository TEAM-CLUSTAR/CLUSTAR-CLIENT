import type { Meta, StoryObj } from '@storybook/react';

import TextContent from './text-content';

const meta: Meta<typeof TextContent> = {
  title: 'Components/TextContent',
  component: TextContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    mode: {
      control: 'radio',
      options: ['detail', 'prompt'],
      description: '표시 모드 설정',
    },
    isAiResult: {
      control: 'boolean',
      description: 'AI 결과 여부',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextContent>;

export const Default: Story = {
  args: {
    isAiResult: false,
    mode: 'detail',
    title: '일반 텍스트 제목',
    content:
      '이것은 일반적인 텍스트 콘텐츠의 내용입니다. 컴포넌트가 어떻게 렌더링되는지 확인하세요.',
  },
};

export const AiResultDetail: Story = {
  args: {
    isAiResult: true,
    mode: 'detail',
    title: 'AI 요약 결과 (상세)',
    content:
      'AI가 분석한 상세한 요약 내용입니다. 아이콘과 AI 요약본 라벨이 함께 표시됩니다.',
  },
};

export const AiResultPrompt: Story = {
  args: {
    isAiResult: true,
    mode: 'prompt',
    title: 'AI 프롬프트 결과',
    content:
      '프롬프트 모드에서 렌더링된 AI 결과물입니다. 컨테이너 스타일이 다르게 적용됩니다.',
  },
};
