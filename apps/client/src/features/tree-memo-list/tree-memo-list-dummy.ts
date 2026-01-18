import { MemoInfoTypes } from '@shared/types/memo-info-type';

export const DUMMY_MEMOS: MemoInfoTypes[] = [
  // 1. SOPT 세미나 회고 (기술 깊이 있는 내용)
  {
    id: 101,
    labelList: {
      dateText: '2026.01.14',
      labelItems: [
        { id: 'tag-1', text: 'SOPT' },
        { id: 'tag-2', text: '레퍼런스' },
      ],
    },
    textContent: {
      isAiResult: true,
      title: 'Next.js 14 App Router 도입 전 반드시 고려해야 할 캐싱 전략',
      content: `Next.js 14로 마이그레이션을 진행하면서 가장 애를 먹었던 부분은 단연 '캐싱(Caching)'이었다. 
      
기존 Pages Router와 다르게 App Router는 기본적으로 모든 fetch 요청을 캐싱하려고 한다. 이를 'Full Route Cache'라고 부르는데, 정적 페이지 생성(SSG)과 유사하게 동작한다. 하지만 실시간 데이터가 중요한 커뮤니티 기능에서는 이 부분이 독이 될 수 있다.

1. Request Memoization: 동일한 URL로의 fetch 요청을 중복해서 보내지 않도록 React Component 트리 내에서 공유하는 기능.
2. Data Cache: 백엔드 서버로부터 받은 데이터를 영구적으로 저장. (revalidate 옵션 중요)
3. Full Route Cache: 빌드 타임에 렌더링된 HTML과 RSC Payload를 저장.

이번 프로젝트에서는 'force-dynamic'을 무분별하게 사용하기보다는, 필요한 데이터 세그먼트 별로 'revalidateTime'을 다르게 가져가는 전략을 취하기로 했다. 특히 유저 프로필 같은 개인화 데이터는 'cookies()'나 'headers()'를 사용하면 자동으로 동적 렌더링으로 전환된다는 점을 명심하자.`,
    },
    images: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1633356122544-f134324a6cee?q=80&w=1000&auto=format&fit=crop',
        imageAlt: 'React 코드 모니터 화면',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '데이터베이스 구조 다이어그램',
      },
    ],
    files: [
      {
        fileName: 'Nextjs_Caching_DeepDive.pdf',
        fileSize: '4.2MB',
        fileUrl: '#',
      },
    ],
    selectedMemos: [{ id: 99, memoName: '서버 컴포넌트 기초' }],
  },

  // 2. 졸업 프로젝트 기획 (디자인 시스템 관련)
  {
    id: 102,
    labelList: {
      dateText: '2026.01.16',
      labelItems: [{ id: 'tag-3', text: '졸업 프로젝트' }],
    },
    textContent: {
      isAiResult: false,
      title: '졸업작품 디자인 시스템: Atomic Design Pattern 적용기',
      content: `우리 팀은 효율적인 컴포넌트 재사용을 위해 아토믹 디자인(Atomic Design) 패턴을 도입하기로 결정했다. Figma에 정의된 변수들을 Vanilla Extract의 theme contract로 옮기는 작업이 우선이다.

- Atoms (원자): 더 이상 쪼갤 수 없는 요소. 버튼, 인풋, 라벨, 아이콘 등. 색상이나 폰트 사이즈 같은 글로벌 토큰들이 직접적으로 적용되는 레벨.
- Molecules (분자): 원자들의 결합. 검색 폼(인풋 + 버튼), 카드 아이템(이미지 + 텍스트) 등. 여기서부터는 비즈니스 로직이 아주 조금씩 개입될 수 있다.
- Organisms (유기체): GNB, 푸터, 사이드바 등 서비스의 구획을 나누는 큰 덩어리.

가장 고민인 점은 '어디까지가 분자이고 어디부터가 유기체인가?'에 대한 기준이다. 팀원들과 논의 끝에, "Context API나 전역 상태에 의존하면 유기체, Props로만 동작하면 분자"라는 우리만의 임시 기준을 세웠다.`,
    },
    images: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '피그마 디자인 시스템 화면',
      },
    ],
    files: [
      {
        fileName: 'Design_System_v0.9.fig',
        fileSize: '15MB',
        fileUrl: '#',
      },
      {
        fileName: 'Component_List.xlsx',
        fileSize: '24KB',
        fileUrl: '#',
      },
    ],
  },

  // 3. 교양 수업 노트 (인문학적 소양)
  {
    id: 103,
    labelList: {
      dateText: '2025.12.20',
      labelItems: [{ id: 'tag-4', text: '교양' }],
    },
    textContent: {
      isAiResult: false,
      title: '[미술사의 이해] 바우하우스가 현대 웹 디자인에 미친 영향',
      content: `바우하우스(Bauhaus)의 "형태는 기능을 따른다(Form follows function)"는 철학은 현대 웹 디자인, 특히 미니멀리즘과 플랫 디자인의 근간이 되었다.

1. 타이포그래피의 중요성: 장식적인 요소를 배제하고 산세리프 서체를 사용하여 가독성을 극대화함. 이는 모바일 환경에서의 가독성 문제와 직결된다.
2. 그리드 시스템: 바우하우스의 편집 디자인에서 사용된 그리드 시스템은 오늘날 반응형 웹 디자인(Responsive Web Design)의 핵심 원리가 되었다.
3. 색채학: 칸딘스키와 이텐의 색채 연구는 UI 디자인에서 컬러 팔레트를 구성하는 논리적인 배경을 제공한다.

교수님이 강조하신 부분: "단순함은 비어있음이 아니라, 불필요한 것을 제거한 상태다." 코드를 짤 때도 마찬가지가 아닐까? 불필요한 의존성을 제거하는 것이 진정한 최적화인 것처럼.`,
    },
    images: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '미술관 전시 전경',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '타이포그래피 스케치',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '미니멀한 인테리어',
      },
    ],
  },

  // 4. 짧은 메모 (이미지 없음, 태그 없음)
  {
    id: 104,
    labelList: {
      dateText: '2025.12.20',
      labelItems: [{ id: 'tag-5', text: '라벨 없음' }],
    },
    textContent: {
      isAiResult: false,
      title: '내일 할 일 리스트',
      content: `- [ ] 운영체제 과제 제출 (데드라인 18:00)
- 알고리즘 스터디 문제 풀기 (백준 골드 5 문제)
- 헬스장 가기 (하체 하는 날)
- 저녁 약속: 강남역 7번 출구`,
    },
  },

  // 5. 레퍼런스 수집 (이미지 중심)
  {
    id: 105,
    labelList: {
      dateText: '2026.01.05',
      labelItems: [{ id: 'tag-6', text: '레퍼런스' }],
    },
    textContent: {
      isAiResult: true,
      title: '2026 UI 트렌드: Bento Grids & Glassmorphism',
      content: `애플의 Vision Pro 출시 이후 공간감(Spatial)을 살린 UI가 다시 주목받고 있다. 

특히 'Bento Grid' 레이아웃은 정보를 직관적인 사각형 블록으로 나누어 보여주는데, 이는 모바일과 데스크탑 모두에서 유연하게 대응할 수 있다는 장점이 있다. 또한, 배경을 흐리게 처리하는 글래스모피즘(Glassmorphism)이 더 얇고 세련된 형태로 진화하여 돌아왔다. 그림자는 더 부드러워졌고, 경계선은 아주 얇은 1px 그라데이션으로 처리하는 것이 포인트.`,
    },
    images: [
      {
        imageUrl:
          'https://images.unsplash.com/photo-1481480741243-7b295f9461ce?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '깔끔한 데스크탑 셋업과 UI',
      },
      {
        imageUrl:
          'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
        imageAlt: '추상적인 3D 그래픽',
      },
    ],
  },
];
