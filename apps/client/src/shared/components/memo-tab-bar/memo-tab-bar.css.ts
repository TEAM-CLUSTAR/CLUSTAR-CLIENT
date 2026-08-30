import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '0.8rem',
  paddingInline: '4rem',
  minWidth: 0,
  height: '7.2rem',
  borderBottom: `1px solid ${themeVars.color.grey200}`,
});

export const tabContainer = style({
  display: 'flex',
  alignItems: 'center',
  minWidth: 0,
  overflowX: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});
