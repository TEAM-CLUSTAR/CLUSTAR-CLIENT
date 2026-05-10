import type { Meta, StoryObj } from '@storybook/react';

import Card from './card';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof meta>;

const labelItems = [
  { id: '1', text: '졸업 프로젝트' },
  { id: '2', text: 'SOPT' },
  { id: '3', text: '레퍼런스' },
];

const defaultArgs = {
  item: labelItems,
  title: 'AI 요약 결과입니다',
  contents:
    '이 메모는 여러 개의 메모를 AI가 요약해서 만든 결과입니다. 두 줄까지만 보이고 말줄임 처리됩니다.',
  fileCount: 3,
  imageCount: 5,
  date: '2025.12.31',
  onClick: () => {},
};

export const Default: Story = {
  args: {
    ...defaultArgs,
  },
};

export const WithImage: Story = {
  args: {
    ...defaultArgs,
    imageUrl: 'https://picsum.photos/640/360',
    imageAlt: 'card image',
  },
};

export const WithoutImage: Story = {
  args: {
    ...defaultArgs,
    imageUrl: undefined,
  },
};

export const NewAiResultCard: Story = {
  args: {
    ...defaultArgs,
    aiNewResult: true,
    imageUrl: 'https://picsum.photos/640/360?random=1',
    imageAlt: 'ai new result image',
  },
};

export const AiResultCard: Story = {
  args: {
    ...defaultArgs,
    aiResult: true,
    imageUrl: 'https://picsum.photos/640/360?random=2',
    imageAlt: 'ai result image',
  },
};
