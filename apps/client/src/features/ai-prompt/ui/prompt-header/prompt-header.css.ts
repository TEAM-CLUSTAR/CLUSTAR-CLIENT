import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const header = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '2.2rem 2.4rem',
  margin: '0 -2.4rem',
  borderBottom: `1px solid ${themeVars.color.grey300}`,
});

export const titleContainer = style({
  display: 'flex',
  alignItems: 'center',
  gap: '0.4rem',
});

export const title = style({
  ...themeVars.fontStyles.title_sb_18,
  color: themeVars.color.blue500,
});
