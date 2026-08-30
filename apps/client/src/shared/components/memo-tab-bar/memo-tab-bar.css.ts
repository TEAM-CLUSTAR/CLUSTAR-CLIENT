import { style } from '@vanilla-extract/css';

export const tabBar = style({
  display: 'flex',
  alignItems: 'center',
  flexShrink: 0,
  gap: '0.8rem',
  paddingInline: '4rem',
  minWidth: 0,
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
