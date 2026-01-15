import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

import { Icon } from '@cds/icon';

import DetailModal from './detail-modal';

const meta: Meta<typeof DetailModal> = {
  title: 'Components/DetailModal',
  component: DetailModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    trigger: { control: false },
  },
  args: {
    generateAiButton: {
      onClick: fn(),
    },
    trigger: (
      <button
        type="button"
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          backgroundColor: '#000',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          cursor: 'pointer',
        }}
      >
        <span>모달 열기</span>
        <Icon name="ic_ai_gra" width={20} height={20} />
      </button>
    ),
  },
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    labelList: {
      labelItems: [
        { id: 1, name: '졸업 프로젝트' },
        { id: 2, name: '교양' },
      ],
      dateText: '2024.01.15',
    },
    textContent: {
      isAiResult: false,
      title: '2024년 1분기 서비스 기획 회의',
      content:
        '이번 분기 서비스 고도화를 위해 기획팀과 개발팀이 모여 논의를 진행했습니다. 주요 안건으로는 UX 개선과 신규 기능 도입이 있었으며, 구체적인 일정은 다음 주까지 확정하기로 했습니다. \n\n1. 메인 화면 개편 \n2. 검색 기능 강화 \n3. 마이페이지 대시보드화',
    },
    images: [
      {
        imageUrl: 'https://via.placeholder.com/150',
        imageAlt: '회의실 화이트보드 사진 1',
      },
      {
        imageUrl: 'https://via.placeholder.com/150/0000FF/808080',
        imageAlt: '디자인 시안 스케치',
      },
      {
        imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF',
        imageAlt: '참고 레퍼런스 이미지',
      },
    ],
    files: [
      {
        fileName: '2024_1분기_기획안.pdf',
        fileSize: '2.4MB',
        fileUrl: '#',
      },
      {
        fileName: '회의록_녹음.mp3',
        fileSize: '15MB',
        fileUrl: '#',
      },
    ],
    memos: [
      { id: 1, memoName: '기획 아이디어 스케치' },
      { id: 2, memoName: '경쟁사 분석 노트' },
      { id: 3, memoName: '1월 2주차 주간보고' },
    ],
  },
};

export const WithoutImages: Story = {
  args: {
    ...Default.args,
    images: undefined,
  },
};

export const SimpleContent: Story = {
  args: {
    ...Default.args,
    images: undefined,
    files: undefined,
    memos: undefined,
    textContent: {
      isAiResult: false,
      title: '간단한 메모',
      content: '첨부파일이나 이미지 없이 텍스트로만 작성된 내용입니다.',
    },
  },
};

export const AiGeneratedResult: Story = {
  args: {
    ...Default.args,
    images: undefined,
    textContent: {
      isAiResult: true,
      title: 'AI 요약 결과',
      content:
        'AI가 회의록을 자동으로 요약했습니다. \n핵심 키워드: #기획 #개발 #일정 \n\n전체적인 흐름은 긍정적이었으나 일정 조율이 필요해 보입니다.',
    },
  },
};
