import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const headerContainer = style({
  backgroundColor: themeVars.color.blue25,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '3rem 12rem',
  borderBottom: `1px solid ${themeVars.color.grey300}`,
  width: '100%',
});

export const headerContent = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '1.1rem',
});

export const loginLink = style({
  color: themeVars.color.blue500,
  ...themeVars.fontStyles.title_sb_20,
});
