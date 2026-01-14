import type { Meta, StoryObj } from '@storybook/react';

import DetailModal from './detail-modal';

const meta: Meta<typeof DetailModal> = {
  title: 'Components/Modal/DetailModal',
  component: DetailModal,
  parameters: {
    layout: 'centered',
  },
};

export default meta;

type Story = StoryObj<typeof DetailModal>;

export const Default: Story = {
  args: {
    trigger: <button>상세 보기</button>,

    labelItems: [
      { id: 1, text: '졸업 프로젝트' },
      { id: 2, text: '교양' },
      { id: 3, text: 'SOPT' },
    ],
    dateText: '2026.01.15',

    title: 'AI 기반 문서 요약 및 정리 결과',
    content:
      '이 문서는 여러 개의 메모와 자료를 기반으로 AI가 자동으로 생성한 결과입니다.\n\n' +
      '기존에 작성된 메모들을 분석하여 핵심 내용을 추출하고, 중복되는 정보를 제거한 뒤 하나의 구조화된 문서 형태로 재구성했습니다.\n\n' +
      '해당 결과는 참고용이며, 최종 문서로 사용하기 전 반드시 검토가 필요합니다.',

    isAiResult: true,

    imgs: [
      {
        imageUrl: 'https://picsum.photos/600/400?random=1',
        imageAlt: '참고 이미지 1',
      },
      {
        imageUrl: 'https://picsum.photos/600/400?random=2',
        imageAlt: '참고 이미지 2',
      },
      {
        imageUrl: 'https://picsum.photos/600/400?random=3',
        imageAlt: '참고 이미지 3',
      },
      {
        imageUrl: 'https://picsum.photos/600/400?random=4',
        imageAlt: '참고 이미지 4',
      },
    ],

    memos: [
      {
        id: 1,
        memoName: '사용자 인터뷰 결과',
      },
      {
        id: 2,
        memoName: '경쟁 서비스 분석',
      },
      {
        id: 3,
        memoName: 'AI 요약 기능에 대한 내부 논의 내용',
      },
      {
        id: 4,
        memoName: '초기 프로토타입 테스트',
      },
    ],

    files: [
      {
        fileName: '시장조사_리포트.pdf',
        fileSize: '3.4MB',
        fileUrl: '/files/market-report.pdf',
      },
      {
        fileName: '사용자_인터뷰_정리.pdf',
        fileSize: '1.8MB',
        fileUrl: '/files/interview.docx',
      },
      {
        fileName: '와이어프레임.pdf',
        fileSize: '920KB',
        fileUrl: '/files/wireframe.png',
      },
    ],

    onClick: () => {
      alert('AI 생성 버튼 클릭');
    },
  },
};

export const ManyImages: Story = {
  args: {
    ...Default.args,
    imgs: Array.from({ length: 8 }).map((_, index) => ({
      imageUrl: `https://picsum.photos/600/400?random=${index + 10}`,
      imageAlt: `이미지 ${index + 1}`,
    })),
  },
};

export const LongArticleMemos: Story = {
  args: {
    ...Default.args,
    imgs: undefined,
    memos: [
      {
        id: 1,
        memoName: '프로젝트 배경',
      },
      {
        id: 2,
        memoName: '번거로운 작업',
      },
      {
        id: 3,
        memoName: 'AI를 활용한 여러 개의 메모',
      },
    ],
  },
};
