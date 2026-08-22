import { style } from '@vanilla-extract/css';

import { slideInRight, themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  width: '48rem',
  height: '100%',
  backgroundColor: themeVars.color.white,
  borderLeft: `1px solid ${themeVars.color.grey200}`,
  animation: `${slideInRight} 0.3s cubic-bezier(0.4, 0, 0.2, 1)`,
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.6rem',
  flex: 1,
  minHeight: 0,
  padding: '1.6rem',
});

export const chatAreaViewport = style({
  position: 'relative',
  flex: 1,
  minHeight: 0,
});

export const chatArea = style({
  position: 'absolute',
  inset: 0,
  overflowY: 'auto',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  selectors: {
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
});

export const chatContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '3.6rem',
  minHeight: '100%',
});

export const scrollbar = style({
  position: 'absolute',
  top: 0,
  right: '-1.2rem',
  bottom: 0,
  width: '0.6rem',
});

export const scrollbarThumb = style({
  width: '100%',
  borderRadius: '999px',
  backgroundColor: themeVars.color.grey300,
  cursor: 'pointer',
});
