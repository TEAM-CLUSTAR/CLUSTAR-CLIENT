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
    isAiOutput: {
      control: 'boolean',
    },
    isPreview: {
      control: 'boolean',
    },
    title: {
      control: 'text',
    },
    content: {
      control: 'text',
    },
  },
};

export default meta;

type Story = StoryObj<typeof TextContent>;

export const AISummaryDetail: Story = {
  args: {
    isAiOutput: true,
    isPreview: false,
    title: '3줄 요약',
    content: '상세 보기 모드입니다. 아이콘이 보이고 간격이 넓습니다.',
  },
};

export const AISummaryPreview: Story = {
  args: {
    isAiOutput: true,
    isPreview: true,
    title: '요약 미리보기',
    content: '미리보기 모드입니다. 아이콘이 보이고 간격이 좁습니다.',
  },
};

export const NormalText: Story = {
  args: {
    isAiOutput: false,
    isPreview: false,
    title: '일반 텍스트',
    content: '일반 텍스트 모드입니다. 아이콘이 없습니다.',
  },
};

export const VirtualizationArticle: Story = {
  args: {
    isAiOutput: true,
    isPreview: false,
    title: '리스트 가상화 (Windowing) 개념 및 가이드',
    content: `윈도잉(Windowing)이라고도 알려진 리스트 가상화는, 로드된 동적 목록을 렌더링할 때 전체 목록을 한 번에 렌더링하지 않고 현재 화면(뷰포트)에 실제로 보이는 콘텐츠의 행들만 렌더링하는 기법이다.
예를 들어 10,000개의 데이터 리스트를 화면에 보여준다고 가정하면, 가상화를 적용하지 않을 경우 10,000개의 DOM 노드가 한 번에 생성된다. 이는 저사양 기기나 모바일 환경에서 성능 저하를 일으키거나, 심한 경우 브라우저가 멈추거나 종료되는 문제로 이어질 수 있다. 또한 사용자는 초기 렌더링이 끝날 때까지 빈 화면을 오랫동안 보게 되는 불편을 겪게 된다. 이러한 문제를 해결하기 위해 데이터 리스트 가상화 기법이 등장했다.

리스트 가상화를 구현할 때 자주 사용되는 라이브러리는 다음과 같다.

react-virtuoso

react-window

@tanstack/react-virtual

react-virtualized

리스트 가상화의 작동 방식은 다음과 같다.

첫째, 뷰포트에서 실제로 보이는 아이템 개수에 약간의 버퍼를 더한 수만큼의 DOM 요소만 렌더링한다.

둘째, 사용자가 스크롤을 하면 라이브러리가 스크롤 위치(scrollTop)를 감지하고, 현재 스크롤 위치가 전체 데이터 중 몇 번째 항목 근처인지 계산한다.

셋째, 기존에 렌더링된 DOM 요소들의 내용을 새로운 데이터로 교체한다.

넷째, 이 DOM 요소들을 transform: translateY()를 사용해 올바른 위치로 이동시킨다. 이때 transform 속성은 Reflow를 유발하지 않기 때문에 비교적 빠르게 동작한다.

리스트 가상화의 장점은 명확하다.

필요한 항목만 렌더링하므로 초기 로딩 시간과 메모리 사용량이 크게 줄어들어 전반적인 성능이 향상된다.

대량의 데이터가 있어도 DOM 수가 제한되기 때문에 스크롤이 훨씬 부드럽게 동작한다.

또한 실제 DOM 요소의 개수가 적어 브라우저가 관리해야 할 부담이 줄어든다.

다만 리스트 가상화를 사용할 때는 몇 가지 주의사항이 있다.

초기 설정이 매우 중요하며, itemSize나 리스트의 높이·너비를 잘못 설정하면 스크롤 위치 계산이 틀어질 수 있다.

가상화 적용 전과 후의 성능을 실제로 비교해 보고, 정말로 성능 개선이 이루어졌는지 모니터링하는 것이 필요하다.

접근성 측면에서도 키보드 네비게이션과 스크린 리더가 정상적으로 동작하는지 반드시 고려해야 한다.

또한 서버 사이드 렌더링과 함께 사용하는 경우, 가상화가 SEO에 어떤 영향을 미치는지도 신중히 검토해야 한다.`,
  },
  parameters: {
    layout: 'padded',
  },
};
