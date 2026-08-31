import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const memoInputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.8rem',
  width: '95.6rem',
});

export const footerContainer = style({
  display: 'flex',
  justifyContent: 'space-between',
});

export const buttonContainer = style({
  width: '12.4rem',
});

export const inputContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2.8rem',
  padding: '2.4rem 2.8rem',
  backgroundColor: themeVars.color.grey50,
  borderRadius: '24px',
  border: `2px solid ${themeVars.color.white}`,
  boxShadow: `0 0 5px 0 rgba(0, 0, 0, 0.20)`,
});

export const contentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
});
