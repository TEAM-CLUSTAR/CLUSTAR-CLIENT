import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: themeVars.color.grey50,
});
export const contentsContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  color: themeVars.color.grey600,
  gap: '7.2rem',
});
export const errorText = style({
  ...themeVars.fontStyles.title_sb_24,
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.2rem',
});

export const errorTitle = style({
  ...themeVars.fontStyles.display_sb_36,
});

export const buttonContainer = style({
  marginTop: '3.8rem',
});
