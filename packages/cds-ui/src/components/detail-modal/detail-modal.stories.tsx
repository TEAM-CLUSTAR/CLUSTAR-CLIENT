import type { Meta, StoryObj } from '@storybook/react';

import { Icon } from '@cds/icon';

import { LabelTextType } from '../../constants/label-color-map';
import Modal from '../modal/modal';
import DetailModal from './detail-modal';

const meta: Meta<typeof DetailModal> = {
  title: 'Components/DetailModal',
  component: DetailModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: { control: false },
    onAiCreateClick: { action: 'onAiCreateClick' },
  },
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

const TriggerButton = (
  <Modal.Trigger>
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
        border: 'none',
      }}
    >
      <span>모달 열기</span>
      <Icon name="ic_ai_gra" width={20} height={20} />
    </button>
  </Modal.Trigger>
);

export const Default: Story = {
  args: {
    children: TriggerButton,
    id: 1,
    data: {
      memoId: 1,
      title: '2024년 1분기 서비스 기획 회의',
      content:
        '이번 분기 서비스 고도화를 위해 기획팀과 개발팀이 모여 논의를 진행했습니다. 주요 안건으로는 UX 개선과 신규 기능 도입이 있었으며, 구체적인 일정은 다음 주까지 확정하기로 했습니다. \n\n1. 메인 화면 개편 \n2. 검색 기능 강화 \n3. 마이페이지 대시보드화',
      createdAt: '2024-01-15T14:30:00Z',
      isAiGenerated: false,
      labelList: [
        { labelId: 1, name: '업무' as LabelTextType },
        { labelId: 2, name: '학업' as LabelTextType },
      ],
      images: [
        {
          imageId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          imageName: '회의실 화이트보드 사진 1',
          imageExtension: 'jpg',
          imageSize: '1.2MB',
        },
        {
          imageId: 2,
          imageUrl: 'https://via.placeholder.com/150/0000FF/808080',
          imageName: '디자인 시안 스케치',
          imageExtension: 'png',
          imageSize: '2.5MB',
        },
        {
          imageId: 3,
          imageUrl: 'https://via.placeholder.com/150/FF0000/FFFFFF',
          imageName: '참고 레퍼런스 이미지',
          imageExtension: 'jpg',
          imageSize: '800KB',
        },
      ],
      files: [
        {
          fileId: 1,
          fileName: '2024_1분기_기획안.pdf',
          fileSize: '2.4MB',
          fileUrl: '#',
          fileExtension: 'pdf',
        },
        {
          fileId: 2,
          fileName: '회의록_녹음.mp3',
          fileSize: '15MB',
          fileUrl: '#',
          fileExtension: 'mp3',
        },
      ],
      sourceMemoTitleList: [
        '기획 아이디어 스케치',
        '경쟁사 분석 노트',
        '1월 2주차 주간보고',
      ],
    },
    onAiCreateClick: (id: number) =>
      alert(`AI 정리 모달 열기 (메모 ID: ${id})`),
  },
};

export const WithoutImages: Story = {
  args: {
    children: TriggerButton,
    id: 2,
    data: {
      memoId: 2,
      title: '독서 기록',
      content: '오늘 읽은 책의 주요 내용을 정리했습니다.',
      createdAt: '2024-01-16T09:00:00Z',
      isAiGenerated: false,
      labelList: [{ labelId: 1, name: '개인' as LabelTextType }],
      images: [],
      files: [
        {
          fileId: 1,
          fileName: '독서노트.pdf',
          fileSize: '1.2MB',
          fileUrl: '#',
          fileExtension: 'pdf',
        },
      ],
      sourceMemoTitleList: ['책 추천 리스트'],
    },
  },
};

export const SimpleContent: Story = {
  args: {
    children: TriggerButton,
    id: 3,
    data: {
      memoId: 3,
      title: '간단한 메모',
      content: '첨부파일이나 이미지 없이 텍스트로만 작성된 내용입니다.',
      createdAt: '2024-01-17T11:20:00Z',
      isAiGenerated: false,
      labelList: [{ labelId: 1, name: '기타' as LabelTextType }],
      images: [],
      files: [],
      sourceMemoTitleList: [],
    },
  },
};

export const AiGeneratedResult: Story = {
  args: {
    children: TriggerButton,
    id: 4,
    data: {
      memoId: 4,
      title: 'AI 요약 결과',
      content:
        'AI가 회의록을 자동으로 요약했습니다. \n\n핵심 키워드: #기획 #개발 #일정 \n\n전체적인 흐름은 긍정적이었으나 일정 조율이 필요해 보입니다.',
      createdAt: '2024-01-17T15:45:00Z',
      isAiGenerated: true,
      labelList: [{ labelId: 1, name: '업무' as LabelTextType }],
      images: [],
      files: [],
      sourceMemoTitleList: ['회의록 원본', '프로젝트 타임라인'],
    },
  },
};

export const WithManyMemos: Story = {
  args: {
    children: TriggerButton,
    id: 5,
    data: {
      memoId: 5,
      title: '종합 정리 노트',
      content: '여러 메모를 참고하여 작성한 종합 정리 내용입니다.',
      createdAt: '2024-01-17T20:00:00Z',
      isAiGenerated: false,
      labelList: [
        { labelId: 1, name: '학업' as LabelTextType },
        { labelId: 2, name: '기타' as LabelTextType },
      ],
      images: [
        {
          imageId: 1,
          imageUrl: 'https://via.placeholder.com/150',
          imageName: '다이어그램',
          imageExtension: 'png',
          imageSize: '1MB',
        },
      ],
      files: [],
      sourceMemoTitleList: [
        '1주차 강의노트',
        '2주차 강의노트',
        '3주차 강의노트',
        '중간고사 정리',
        '참고자료 모음',
      ],
    },
    onAiCreateClick: (id: number) => alert(`AI로 정리하기 클릭! (ID: ${id})`),
  },
};

export const NoTags: Story = {
  args: {
    children: TriggerButton,
    id: 6,
    data: {
      memoId: 6,
      title: '태그 없는 메모',
      content: '분류되지 않은 간단한 생각을 기록했습니다.',
      createdAt: '2024-01-17T10:00:00Z',
      isAiGenerated: false,
      labelList: [{ labelId: 1, name: '태그없음' as LabelTextType }],
      images: [],
      files: [],
      sourceMemoTitleList: [],
    },
  },
};

export const MultipleFiles: Story = {
  args: {
    children: TriggerButton,
    id: 7,
    data: {
      memoId: 7,
      title: '프로젝트 자료 모음',
      content: '프로젝트 관련 모든 파일을 첨부했습니다.',
      createdAt: '2024-01-17T18:30:00Z',
      isAiGenerated: false,
      labelList: [{ labelId: 1, name: '업무' as LabelTextType }],
      images: [],
      files: [
        {
          fileId: 1,
          fileName: '제안서_최종.pdf',
          fileSize: '3.5MB',
          fileUrl: '#',
          fileExtension: 'pdf',
        },
        {
          fileId: 2,
          fileName: '예산계획.xlsx',
          fileSize: '856KB',
          fileUrl: '#',
          fileExtension: 'xlsx',
        },
        {
          fileId: 3,
          fileName: '디자인시안.psd',
          fileSize: '45MB',
          fileUrl: '#',
          fileExtension: 'psd',
        },
        {
          fileId: 4,
          fileName: '참고자료.zip',
          fileSize: '12MB',
          fileUrl: '#',
          fileExtension: 'zip',
        },
      ],
      sourceMemoTitleList: [],
    },
  },
};
