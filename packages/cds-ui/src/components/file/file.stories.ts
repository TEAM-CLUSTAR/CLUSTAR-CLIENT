import type { Meta, StoryObj } from '@storybook/react';

import File from './file';

const meta: Meta<typeof File> = {
  title: 'Components/File',
  component: File,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fileName: {
      control: 'text',
      description: '파일의 이름입니다. 길어지면 말줄임표(...) 처리됩니다.',
    },
    fileSize: {
      control: 'text',
      description: '파일의 용량입니다.',
    },
    fileUrl: {
      control: 'text',
      description: '클릭 시 이동할 파일 경로입니다.',
    },
  },
} satisfies Meta<typeof File>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fileName: '2024_상반기_사업계획서.pdf',
    fileSize: '2.4 MB',
    fileUrl: 'https://pdfobject.com/pdf/sample.pdf',
  },
};

export const LongFileName: Story = {
  args: {
    fileName:
      '이것은_파일_이름이_매우매우_길어서_영역을_넘어가는_경우의_테스트_파일입니다_최종_진짜최종_수정.pdf',
    fileSize: '15.2 MB',
    fileUrl: '#',
  },
  parameters: {
    docs: {
      description: {
        story:
          '파일 이름이 영역을 넘어갈 경우 CSS `text-overflow: ellipsis`가 적용되어 말줄임표(...)로 표시되는지 확인합니다.',
      },
    },
  },
};

export const LongFileSize: Story = {
  args: {
    fileName: '디자인_가이드.pdf',
    fileSize: '1024.59 MB',
    fileUrl: '#',
  },
};
