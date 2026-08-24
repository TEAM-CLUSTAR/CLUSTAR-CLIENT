import { style } from '@vanilla-extract/css';

import { themeVars } from '@cds/ui';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '2rem',
});

export const image = style({
  width: '24rem',
  height: '24rem',
  objectFit: 'contain',
});

export const textContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.8rem',
  textAlign: 'center',
});

export const title = style({
  width: '100%',
  color: themeVars.color.grey700,
  ...themeVars.fontStyles.title_sb_24,
});

export const description = style({
  width: '100%',
  color: themeVars.color.grey500,
  ...themeVars.fontStyles.title_m_18,
});
