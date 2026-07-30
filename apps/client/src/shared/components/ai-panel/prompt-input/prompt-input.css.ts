import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '12px',
  padding: '1.6rem 1.8rem',
  boxShadow: `inset 0 0 0 1px ${themeVars.color.grey300}`,
  transition: 'box-shadow 180ms cubic-bezier(0.4, 0, 0.2, 1)',
  selectors: {
    '&:focus-within': {
      boxShadow: `inset 0 0 0 1px ${themeVars.color.blue500}`,
    },
  },
});

export const memoList = style({
  display: 'flex',
  flexWrap: 'nowrap',
  gap: '0.8rem',
  width: '100%',
  overflowX: 'auto',
});

export const textarea = style({
  width: '100%',
  minHeight: '6.6rem',
  maxHeight: '19.2rem',
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...themeVars.fontStyles.body_m_16,
  color: themeVars.color.grey800,
  backgroundColor: 'transparent',
  selectors: {
    '&::placeholder': {
      color: themeVars.color.grey500,
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
