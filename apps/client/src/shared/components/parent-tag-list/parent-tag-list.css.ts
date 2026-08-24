import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  position: 'relative',
  height: '100%',
  maxHeight: '25.6rem',
  padding: '0.4rem 1.8rem 0.4rem 0',
  borderRight: `1px solid ${themeVars.color.grey200}`,
  overflowY: 'auto',
  overflowX: 'hidden',
});

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.4rem',
  width: '13.2rem',
});
