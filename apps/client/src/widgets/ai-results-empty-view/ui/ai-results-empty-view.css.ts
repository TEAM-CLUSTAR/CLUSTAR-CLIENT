import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const title = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey700,
  paddingBottom: '1.2rem',
});

export const description = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey500,
});
