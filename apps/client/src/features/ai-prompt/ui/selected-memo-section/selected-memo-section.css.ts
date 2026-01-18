import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.2rem',
  padding: '1.8rem 0 1.2rem 0',
});

export const label = style({
  ...themeVars.fontStyles.body_m_14,
  color: themeVars.color.grey600,
});

export const memoContainer = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '1.2rem',
});
