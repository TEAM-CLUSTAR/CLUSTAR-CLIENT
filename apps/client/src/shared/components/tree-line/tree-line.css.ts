import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

// 라인 너비
const LINE_WIDTH = '0.8rem';
// 라인 높이
const LINE_HEIGHT = '2.4rem';
// 태그와 라인 사이의 gap
const LINE_TAG_GAP = '0.4rem';
// 태그 간의 gap
const TAG_GAP = '0.4rem';

const ROOT_TAG_GAP = '0.8rem';

const LineBase = {
  content: '',
  position: 'absolute',
  left: `calc(-1 * (${LINE_TAG_GAP} + ${LINE_WIDTH}))`,
  borderLeft: `1px solid ${themeVars.color.grey300}`,
} as const;

/** 트리 최상위 목록. 라인을 그리지 않는다. */
export const root = style({
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: ROOT_TAG_GAP,
});

/** 자식 노드 묶음. 이 안의 항목에만 line이 그려진다. */
export const branch = style({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '3rem',
  listStyle: 'none',
  gap: TAG_GAP,
});

/** 트리 노드 하나. line은 의사요소로 그려지며 형제 위치에 따라 모양이 달라진다. */
export const item = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: TAG_GAP,

  selectors: {
    // 부모에서 내려와 꺾이는 ㄴ자 라인
    [`${branch} > &::before`]: {
      ...LineBase,
      top: `calc(-1 * ${TAG_GAP})`,
      width: LINE_WIDTH,
      height: LINE_HEIGHT,
      borderBottom: `1px solid ${themeVars.color.grey300}`,
      borderBottomLeftRadius: '4px',
    },
    // 다음 형제로 이어지는 세로 라인 (막내는 그리지 X)
    [`${branch} > &:not(:last-child)::after`]: {
      ...LineBase,
      minHeight: `4.8rem`,
      height: '100%',
    },
  },
});
