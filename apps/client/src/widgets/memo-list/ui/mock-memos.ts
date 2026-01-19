// API 연동 후 삭제 예정
import { LabelTextType } from '@shared/types/label-type';

interface LabelItem {
  id: string;
  text: LabelTextType;
}

interface SelectedMemo {
  id: number;
  memoName: string;
}

export interface MockMemo {
  id: string;
  item: LabelItem[];
  title: string;
  contents: string;
  fileCount: number;
  imageCount: number;
  date: string;
  imageUrl?: string;
  imageAlt?: string;
  isSelectedCard?: boolean;
  aiResult?: boolean;
  aiNewResult?: boolean;
  selectedMemos?: SelectedMemo[];
}

export const MOCK_MEMOS: MockMemo[] = [
  {
    id: '1',
    item: [{ id: '1', text: 'SOPT' }],
    title: 'Next.js 14 App Router 캐싱 전략',
    contents:
      'Next.js 14로 마이그레이션을 진행하면서 가장 애를 먹었던 부분은 단연 캐싱(Caching)이었다. 기존 Pages Router와 다르게 App Router는 기본적으로 모든 fetch 요청을 캐싱하려고 한다.',
    fileCount: 5,
    imageCount: 3,
    date: '2024-01-15',
    imageUrl:
      'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'Next.js 코드 화면',
    isSelectedCard: false,
    aiResult: false,
    aiNewResult: false,
  },
  {
    id: '2',
    item: [
      { id: '2', text: '교양' },
      { id: '2-2', text: '레퍼런스' },
    ],
    title: '바우하우스가 현대 웹 디자인에 미친 영향',
    contents:
      '바우하우스의 "형태는 기능을 따른다(Form follows function)"는 철학은 현대 웹 디자인, 특히 미니멀리즘과 플랫 디자인의 근간이 되었다.',
    fileCount: 0,
    imageCount: 2,
    date: '2024-01-14',
    imageUrl:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
    imageAlt: '바우하우스 건축물',
    isSelectedCard: true,
    aiResult: true,
    aiNewResult: false,
    selectedMemos: [
      { id: 1, memoName: '미술사의 이해 강의노트' },
      { id: 2, memoName: '디자인 원칙 정리' },
    ],
  },
  {
    id: '3',
    item: [{ id: '3', text: '레퍼런스' }],
    title: '2026 UI 트렌드: Bento Grids & Glassmorphism',
    contents:
      '애플의 Vision Pro 출시 이후 공간감(Spatial)을 살린 UI가 다시 주목받고 있다. 특히 Bento Grid 레이아웃은 정보를 직관적인 사각형 블록으로 나누어 보여준다.',
    fileCount: 12,
    imageCount: 5,
    date: '2024-01-13',
    imageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop',
    imageAlt: 'UI 디자인 트렌드',
    isSelectedCard: false,
    aiResult: false,
    aiNewResult: true,
  },
  {
    id: '4',
    item: [{ id: '4', text: '졸업 프로젝트' }],
    title: '졸업작품 디자인 시스템: Atomic Design Pattern 적용기',
    contents:
      '우리 팀은 효율적인 컴포넌트 재사용을 위해 아토믹 디자인(Atomic Design) 패턴을 도입하기로 결정했다. Figma에 정의된 변수들을 Vanilla Extract의 theme contract로 옮기는 작업이 우선이다.',
    fileCount: 8,
    imageCount: 1,
    date: '2024-01-12',
    imageUrl:
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
    imageAlt: '디자인 시스템 화면',
    isSelectedCard: false,
    aiResult: true,
    aiNewResult: true,
    selectedMemos: [
      { id: 3, memoName: 'Figma 디자인 시스템 연구' },
      { id: 4, memoName: '컴포넌트 라이브러리 분석' },
      { id: 5, memoName: '아토믹 디자인 패턴 레퍼런스' },
    ],
  },
  {
    id: '5',
    item: [{ id: '5', text: '레퍼런스' }],
    title: '내일 할 일 리스트',
    contents:
      '- [ ] 운영체제 과제 제출 (데드라인 18:00)\n- 알고리즘 스터디 문제 풀기 (백준 골드 5 문제)\n- 헬스장 가기 (하체 하는 날)',
    fileCount: 0,
    imageCount: 0,
    date: '2024-01-11',
    isSelectedCard: false,
    aiResult: false,
    aiNewResult: false,
  },
  {
    id: '6',
    item: [
      { id: '6', text: 'SOPT' },
      { id: '6-2', text: '교양' },
    ],
    title: '서버 컴포넌트와 클라이언트 컴포넌트의 차이점',
    contents:
      'React Server Components는 서버에서만 실행되는 컴포넌트로, 번들 크기를 줄이고 초기 로딩 시간을 단축할 수 있다. 클라이언트 컴포넌트와의 주요 차이점은 하이드레이션 과정이 필요 없다는 것이다.',
    fileCount: 15,
    imageCount: 4,
    date: '2024-01-10',
    imageUrl:
      'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop',
    imageAlt: '서버 구조 다이어그램',
    isSelectedCard: false,
    aiResult: true,
    aiNewResult: false,
    selectedMemos: [
      { id: 6, memoName: 'Next.js 공식 문서' },
      { id: 7, memoName: 'React Server Components 연구' },
    ],
  },
  {
    id: '7',
    item: [{ id: '7', text: '교양' }],
    title: '내일 할 일 리스트',
    contents:
      '- [ ] 운영체제 과제 제출 (데드라인 18:00)\n- 알고리즘 스터디 문제 풀기 (백준 골드 5 문제)\n- 헬스장 가기 (하체 하는 날)',
    fileCount: 0,
    imageCount: 0,
    date: '2024-01-10',
  },
  {
    id: '8',
    item: [{ id: '8', text: 'SOPT' }],
    title: '내일 할 일 리스트',
    contents:
      '- [ ] 운영체제 과제 제출 (데드라인 18:00)\n- 알고리즘 스터디 문제 풀기 (백준 골드 5 문제)\n- 헬스장 가기 (하체 하는 날)',
    fileCount: 0,
    imageCount: 0,
    date: '2024-01-10',
  },
  {
    id: '9',
    item: [{ id: '9', text: '졸업 프로젝트' }],
    title: '내일 할 일 리스트',
    contents:
      '- [ ] 운영체제 과제 제출 (데드라인 18:00)\n- 알고리즘 스터디 문제 풀기 (백준 골드 5 문제)\n- 헬스장 가기 (하체 하는 날)',
    fileCount: 0,
    imageCount: 0,
    date: '2024-01-10',
  },
];
