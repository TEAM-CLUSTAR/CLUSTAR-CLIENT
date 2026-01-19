import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const errorContainer = style({
  backgroundColor: themeVars.color.grey50,
  width: '100vw',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
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
  marginTop: '8.5rem',
  color: themeVars.color.grey600,
});

export const errorTitle = style({
  ...themeVars.fontStyles.display_sb_36,
});

export const buttonContainer = style({
  marginTop: '3.8rem',
});
