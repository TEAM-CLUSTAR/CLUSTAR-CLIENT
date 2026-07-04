import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

import { sidebar } from '../sidebar.css';

// 라인 너비
const LINE_WIDTH = '0.8rem';
// 라인 높이
const LINE_HEIGHT = '2.4rem';
// 태그와 라인 사이의 gap
const GAP = '0.4rem';

const collapsedSidebar = `${sidebar}[data-expanded="false"]`;

const connectorBase = {
  content: '',
  position: 'absolute',
  left: `calc(-1 * (${GAP} + ${LINE_WIDTH}))`,
  borderLeft: `1px solid ${themeVars.color.grey300}`,
} as const;

export const treeChildren = style({
  display: 'flex',
  flexDirection: 'column',
  paddingLeft: '3rem',
  listStyle: 'none',
  gap: GAP,

  selectors: {
    [`${collapsedSidebar} &`]: {
      paddingLeft: 0,
    },
  },
});

export const treeItem = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  gap: GAP,

  selectors: {
    [`${treeChildren} > &::before`]: {
      ...connectorBase,
      top: `calc(-1 * ${GAP})`,
      width: LINE_WIDTH,
      height: LINE_HEIGHT,
      borderBottom: `1px solid ${themeVars.color.grey300}`,
      borderBottomLeftRadius: '4px',
    },
    [`${treeChildren} > &:not(:last-child)::after`]: {
      ...connectorBase,
      top: `1.5rem`,
      bottom: `calc(-1 * ${GAP})`,
    },
    [`${collapsedSidebar} &::before, ${collapsedSidebar} &::after`]: {
      display: 'none',
    },
  },
});
