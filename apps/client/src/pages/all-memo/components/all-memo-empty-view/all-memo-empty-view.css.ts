import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const emptyTitle = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey700,
  padding: '6rem 0 1.2rem 0',
});

export const description = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey500,
  paddingBottom: '3.2rem',
});

export const buttonContainer = style({
  width: '21.8rem',
  height: '5.6rem',
});
