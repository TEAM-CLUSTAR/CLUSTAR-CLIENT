import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const toolBarContainer = style({
  display: 'flex',
  gap: '1.2rem',
  alignItems: 'center',
});

export const imageFileContainer = style({
  display: 'flex',
  gap: '0.4rem',
});

export const vertical = style({
  width: '0.1rem',
  height: '2.2rem',
  backgroundColor: themeVars.color.grey300,
  borderRadius: '50px',
});

export const markDouwnContainer = style({
  display: 'flex',
  gap: '0.4rem',
});
