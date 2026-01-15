import type { Meta, StoryObj } from '@storybook/react';

import ImageContainer from './image-container';

const meta: Meta<typeof ImageContainer> = {
  title: 'Components/ImageContainer',
  component: ImageContainer,
  tags: ['autodocs'],
  argTypes: {
    imageUrl: {
      description: '표시할 이미지의 경로를 입력하세요.',
    },
    imageAlt: {
      description: '이미지에 대한 설명을 입력하세요.',
    },
  },
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ImageContainer>;

export const Default: Story = {
  name: '비율에 맞는 이미지',
  args: {
    imageUrl:
      'https://i.pinimg.com/736x/1a/4d/17/1a4d1738b78110c6ede7db8e90756b2e.jpg',
    imageAlt: '비율에 맞는 이미지',
  },
};

export const PortraitImage: Story = {
  name: '비율이 안 맞는 이미지',
  args: {
    imageUrl:
      'https://i.pinimg.com/736x/5e/f5/4b/5ef54b44e7fef887232e2506120f0e37.jpg',
    imageAlt: '비율이 안 맞는 이미지',
  },
};

export const InvalidPath: Story = {
  name: '이미지 경로 오류 (배경색 확인용)',
  args: {
    imageUrl: '',
  },
};
