import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.8rem',
  backgroundColor: themeVars.color.white,
  borderRadius: '8px',
  padding: '1.8rem 2rem',
  border: `1px solid ${themeVars.color.grey300}`,
});

export const textarea = style({
  width: '100%',
  height: '7.2rem',
  border: 'none',
  outline: 'none',
  resize: 'none',
  ...themeVars.fontStyles.body_m_16,
  backgroundColor: 'transparent',
  selectors: {
    '&:focus::placeholder': {
      color: 'transparent',
    },
  },
});

export const footer = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
});
