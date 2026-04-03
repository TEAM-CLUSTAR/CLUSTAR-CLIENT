import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const img = style({
  minWidth: '39.2rem',
  minHeight: '32.6rem',
  marginBottom: '6rem',
});

export const emptyTitle = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey700,
  marginBottom: '1.2rem',
  whiteSpace: 'nowrap',
});

export const description = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey500,
  whiteSpace: 'nowrap',
});

export const buttonContainer = style({
  width: '21.8rem',
  marginTop: '3.2rem',
});
