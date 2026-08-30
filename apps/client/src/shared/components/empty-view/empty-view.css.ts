import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

export const img = style({
  width: '60rem',
  height: '36rem',
  objectFit: 'contain',
});

export const title = style({
  ...themeVars.fontStyles.display_sb_36,
  color: themeVars.color.grey800,
  marginBottom: '1.2rem',
  whiteSpace: 'nowrap',
});

export const description = style({
  ...themeVars.fontStyles.title_sb_24,
  color: themeVars.color.grey500,
  whiteSpace: 'nowrap',
});

export const button = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '4rem',
  marginTop: '3.2rem',
  padding: '0 2rem',
  borderRadius: '8px',
  backgroundColor: themeVars.color.blue500,
  color: themeVars.color.white,
  ...themeVars.fontStyles.title_sb_18,
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: themeVars.color.blue700,
  },
});
